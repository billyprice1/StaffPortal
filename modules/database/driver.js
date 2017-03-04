// Setting up
import {connect, connection, model, models} from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import cluster from 'cluster';
import logging from '../log.js';
import userSchema from './schemas/user';
import communitySchema from './schemas/community';

userSchema.plugin(findOrCreate);
communitySchema.plugin(findOrCreate);

class Driver {
  connect(config) {
    try {
      // Connect to MongoDB
      connect(config.db_url, {
        autoReconnect: true,
			  connectTimeoutMS: 30000,
			  socketTimeoutMS: 30000,
			  keepAlive: 120,
			  poolSize: 100
      });

      const db = connection;

      const Community = model('Community', communitySchema);
      const User = model('User', userSchema);

      // When we encounter an error
      db.on('error', function(err) {
        logging.err('A worker suffered an error during connection to mongoDB!', {'worker_id': cluster.worker.id, 'err_name': err.name, 'err_message': err.message});
        logging.debug('Worker stack trace: ', {'stack': err.stack});
        return false;
      });

      // Only once per worker
      db.once('open', function() {
        cluster.worker.send({
          type: 'status',
          subject: 'db',
          data: 'ready'
        });
        return true;
      });

    } catch(err) {
      logging.err('A worker suffered an error while setting up mongodb!', {'err_name':err.name, 'err_message':err.message});
      logging.debug('Worker stack trace: ', {'stack': err.stack});
    }
  }
  get() {
    return models;
  }
  getConnection() {
    return connection;
  }
}

module.exports = new Driver();