const {Schema} = require('mongoose');

class UserConnection extends Schema {
  constructor() {
    super({
      platform: {type: String, required: true},
      userData: {type: Object},
      config: {type: Object}
    });
  }
}

module.exports = new UserConnection();