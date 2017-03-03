import os from 'os';
import cluster from 'cluster';

import config from './config.json';
import logging from './modules/log.js';
import db from './modules/database/driver.js';

try {
    if (cluster.isMaster) {
        for (let I = 0; I < os.cpus().length; I++) {
            cluster.fork();
        }
    } else {
      // Connect to mongodb
      const result = db.connect(config);
      
      if (result === false) {
        // Restart worker by suicide (we do not condone suicide we are not responsible by any deaths)
        cluster.worker.kill();
      }
      // Set workers to listen for incoming connections
      require("./server");
    }
} catch (err) {
    logging.crit("A critical error occured!", {err_name: err.name, err_message: err.message, err_stack: err.stack});
}