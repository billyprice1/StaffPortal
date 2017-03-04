import {Schema} from 'mongoose';

import staffMemberSchema from './staffMember';
import roleSchema from './role';

export default new class CommunityConfig extends Schema {
  constructor() {
    super({
      name: {type: String, required: true},
      staff: [staffMemberSchema],
      avatar: {type: Buffer},
      roles: [roleSchema]
    });
  }
}