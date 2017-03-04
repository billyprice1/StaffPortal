import {Schema} from 'mongoose';

import userSchema from './user';
import staffMemberSchema from './staffMember';
import communitySchema from './community';

// The punishment document
export default new class Punishment extends Schema {
  constructor() {
    super({
      type: {type: String, required: true, enum: ['kick', 'ban', 'warn', 'mute', 'gag', 'custom']},
      custom: {type: String, required: false},
      admin: staffMemberSchema,
      reason: {type: String},
      date: {type: Date, required: true},
      info: {type: String},
      violator: {ref: 'User', type: Schema.Types.ObjectId},
      community: communitySchema
    });
  }
}