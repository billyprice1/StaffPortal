const {Schema} = require('mongoose');

const userSchema = require('./user');
const staffMemberSchema = require('./staffMember');
const communitySchema = require('./community');

class Punisment extends Schema {
  constructor() {
    super({
      type: {
        type: String,
        required: true,
        enum: ['kick', 'ban', 'warn', 'mute', 'gag', 'custom']
      },
      custom: {type: String, required: false},
      admin: staffMemberSchema,
      reason: {type: String},
      date: {type: Date, required: true},
      info: {type: String},
      violator: userSchema,
      community: communitySchema
    });
  }
}

module.exports = new Punisment();