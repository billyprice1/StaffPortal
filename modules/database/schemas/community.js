const {Schema} = require('mongoose');

const communityConfigSchema = require('./communityConfig');
const userSchema = require('./user');
const communityConnectionSchema = require('./communityConnection');

class Community extends Schema {
  constructor() {
    super({
      id: {type: String, unique: true, required: true},
      date_created: {type: Date, required: true},
      config: communityConfigSchema,
      creator: userSchema,
      connections: [communityConnectionSchema]
    });
  }
}

module.exports = new Community();