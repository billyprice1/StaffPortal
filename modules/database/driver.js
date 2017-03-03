// Setting up
const {connect, connection, model, models} = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const cluster = require('cluster');
const logging = require('../log.js');
const userSchema = require('./schemas/user');
const communitySchema = require('./schemas/community');

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
          
      var Community = model('Community', communitySchema);
      var User = model('User', userSchema);

      // When we encounter an error
      db.on('error', function(err) {
        logging.err("A worker suffered an error during connection to mongoDB!", {"worker_id": cluster.worker.id, "err_name": err.name, "err_message": err.message});
        logging.debug("Worker stack trace: ", {"stack": err.stack});
        return false;
      });

      // Only once per worker
      db.once('open', function() {
        cluster.worker.send({
          type: "status",
          subject: "db",
          data: "ready"
        });
        return true;
      });
      
    } catch(err) {
      logging.err("A worker suffered an error while setting up mongodb!", {"err_name":err.name,"err_message":err.message});
      logging.debug("Worker stack trace: ", {"stack": err.stack});
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