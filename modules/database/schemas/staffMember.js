const {Schema} = require('mongoose');

const userSchema = require('./user');
const rolesSchema = require('./role');

class StaffMember extends Schema {
  constructor() {
    super({
      user: userSchema,
      roles: [rolesSchema],
      superAdmin: Boolean
    });
  }
}

module.exports = new StaffMember();