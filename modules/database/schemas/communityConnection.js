const {Schema} = require('mongoose');

class CommunityConnections extends Schema {
  constructor() {
    super({
      platform: {type: String, required: true},
      config: {type: Object},
      authData: {type: Object}
    });
  }
}

module.exports = new CommunityConnections();