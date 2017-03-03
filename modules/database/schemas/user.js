const {Schema} = require('mongoose');

const authSchema = require('./userAuth');
const userConfigSchema = require('./userConfig');
const punishmentSchema = require('./punishment');
const userConnectionSchema = require('./userConnection');

class User extends Schema {
  constructor() {
    super({
      auth: authSchema,
      config: userConfigSchema,
      id: {type: String, unique: true},
      date_created: {type: Date},
      punishments: punishmentSchema,
      connections: [userConnectionSchema]
    })
  }
}

module.exports = new User();