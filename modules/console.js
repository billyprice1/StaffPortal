import winston from 'winston';
import mkdirp from 'mkdirp';
import colors from 'colors';
import cluster from 'cluster';
import os from 'os';

import clevels from './levelColors';
import logging from './log';

colors.enabled = true;

if (cluster.isWorker) {
  require('./logger');
  return;
}

mkdirp(__dirname + '/../logs', (err) => {
  if (err) {
    winston.error(`A critical error has occured pre-boot. The staffportal instance failed to log the error to log files.\n${err.name}\n${err.message}\nStaffPortal can not continue boot.`);
  }
});

if (process.argv[2] == 'DEBUG') {
  logging.add(
   new (winston.transports.File)({
     name: 'file-exceptions',
      timestamp: _ => new Date().toUTCString(),
      formatter: function(options) {
        let worker_id = options.meta.worker_id;
        if (options.level == 'crit') {
          return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${'CRITICAL'})` + ` ${options.message ? options.message : 'Unknown Critical Error Occured'}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
        } else {
          return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${options.level == 'err' ? 'ERROR' : options.level.toUpperCase()})` + ` ${(options.message ? options.message : 'No message Specified')}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}`);
        }
      },
      filename: `${__dirname}/../logs/exceptions.log`,
      colorize: false,
      level: 'crit',
      maxsize: 10*1024*1024,
      tailable: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    })
  )
}
logging.on('error', function (err) {
  logging.error('An error occured while attempting to log a message.', {err_n: err.name, err_m: err.message});
});
winston.addColors(clevels.colors);
if (cluster.isMaster) {
  worker_ui_ready = 0;
  worker_agent_ready = 0;
  worker_db_ready = 0;
  cluster.on('message', (worker, msg, hande) => {
    if (!msg.type || msg.type == 'log') {
      msg.data.worker_id = worker.id;
      logging[msg.level](msg.message, msg.data);
      if (msg.level == 'crit') {
        process.exit(1);
      }
    } else if (msg.type == 'status') {
      switch(msg.subject) {
        case 'web':
          if (msg.data == 'ready') {
            worker_ui_ready++;
            logging.logging('Worker interface is listening for incoming connections', {'worker_id':worker.id});
            if (worker_ui_ready == os.cpus().length) {
              logging.info('Web Interface started successfully');
            }
          } else if (msg.data == 'error') {
            logging.warn('A worker has suffered an error while attempting to start the Web Interface. Worker has been restared.', {'worker_id':worker.id,'err_name':msg.err.name,'err_message':msg.err.message});
          } else {
            logging.logging('Worker sent unknown message data, message is ignored',{'worker_id':worker.id,'msg_data':msg.data});
          }
          break;
        case 'agent':
          if (msg.data == 'ready') {
            worker_agent_ready++
            logging.logging('Worker started Agent', {'worker_id':worker.id});
            if (worker_agent_ready == os.cpus().length) {
              logging.info('Third-Party Agent started successfully!');
            }
          } else if (msg.data == 'error') {
            logging.warn('A worker has suffered an error while attempting to start the Web Interface. Worker has been restared.', {'worker_id':worker.id,'err_name':msg.err.name,'err_message':msg.err.message});
          } else {
            logging.logging('Worker sent unknown message data, message is ignored',{'worker_id':worker.id,'msg_data':msg.data});
          }
          break;
        case 'db':
          if (msg.data == 'ready') {
            worker_db_ready++;
            logging.logging('Worker connected to DB');
            if (worker_db_ready == os.cpus().length) {
              logging.info('All workers are connected to MongoDB');
            }
          } else {
            logging.logging('Worker sent unknown message data, message is ignored',{'worker_id':worker.id,'msg_data':msg.data});
          }
          break;
        default:
          logging.logging('Worker sent unknown message subject, message is ignored',{'worker_id':worker.id,'msg_subject':msg.subject});
      }
    }
  })
}
module.exports = logging