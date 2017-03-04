import {Schema} from 'mongoose';

import communityConfigSchema from './communityConfig';
import userSchema from './user';
import communityConnectionSchema from './communityConnection';

export default new class Community extends Schema {
  constructor() {
    super({
      id: {type: String, unique: true, required: true},
      date_created: {type: Date, required: true},
      config: communityConfigSchema,
      creator: {ref: 'User', type: Schema.Types.ObjectId},
      connections: [communityConnectionSchema]
    });
  }
}