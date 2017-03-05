import winston from 'winston';
import clevels from './levelColors';

export default new class Log extends winston.Logger {
  constructor() {
    super({
      exitOnError: false,
      colors: clevels.colors,
      levels: clevels.levels,
      transports: [
        new (winston.transports.Console)({
          name: 'console',
          timestamp: _ => new Date().toUTCString(),
          formatter: (options) => {
            let worker_id = options.meta.worker_id;
            if (options.level == 'crit') {
              return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${'CRITICAL'})` + ` ${options.message ? options.message : 'Unknown Critical Error Occured'}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
            } else {
              return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${options.level == 'err' ? 'ERROR' : options.level.toUpperCase()[clevels.colors[options.level]]})` + ` ${(options.message ? options.message : 'No message Specified')}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}` 
            }
          },
          colorize: true,
          level: 'info'
        }),
        new (winston.transports.File)({
          name: 'file-info',
          timestamp: _ => new Date().toUTCString(),
          formatter: (options) => {
            let worker_id = options.meta.worker_id;
            if (options.level == 'crit') {
              return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${'CRITICAL'})` + ` ${options.message ? options.message : 'Unknown Critical Error Occured'}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
            } else {
              return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${options.level == 'err' ? 'ERROR' : options.level.toUpperCase()})` + ` ${(options.message ? options.message : 'No message Specified')}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}` 
            }
          },
          filename: `${__dirname}/../logs/err-log.log`,
          colorize: false,
          level: 'info',
          maxsize: 10*1024*1024,
          tailable: true,
          json: false
        }),
        new (winston.transports.File)({
          name: 'file-verbose',
          timestamp: _ => new Date().toUTCString(),
          formatter: (options) => {
            let worker_id = options.meta.worker_id;
            if (options.level == 'crit') {
              return (`(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${'CRITICAL'})` + ` ${options.message ? options.message : 'Unknown Critical Error Occured'}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}`+`\n\t\tStaffPortal can not continue and will shutdown.`);
            } else {
              return `(${options.timestamp()}) (Worker: ${worker_id ? worker_id : 'master'}) (${options.level == 'err' ? 'ERROR' : options.level.toUpperCase()})` + ` ${(options.message ? options.message : 'No message Specified')}` + `${(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '')}` 
            }
          },
          filename: `${__dirname}/../logs/verbose.log`,
          colorize: false,
          level: 'verbose',
          maxsize: 10*1024*1024,
          tailable: true
        })
      ]
    })
  }
}