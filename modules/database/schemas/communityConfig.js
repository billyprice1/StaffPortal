const {Schema} = require('mongoose');

const staffMemberSchema = require('./staffMember');
const roleSchema = require('./role');

class CommunityConfig extends Schema {
  constructor() {
    super({
      name: {type: String, required: true},
      staff: [staffMemberSchema],
      avatar: {type: Buffer},
      roles: [roleSchema]
    });
  }
}

module.exports = new CommunityConfig();