module.exports = class Logger {
    crit(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "crit"
      }
      cluster.worker.send(tosend)
    }   
    err(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "err"
      }
      cluster.worker.send(tosend)
    }
    warn(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "warn"
      }
      cluster.worker.send(tosend)
    }
    info(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "info"
      }
      cluster.worker.send(tosend)
    }
    log(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "logging"
      }
      cluster.worker.send(tosend)
    }
    debug(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "debug"
      }
      cluster.worker.send(tosend)
    }
    verbose(msg, data) {
      let tosend = {
        message: msg,
        data: data,
        level: "verbose"
      }
      cluster.worker.send(tosend)
    }
  }