import {Schema} from 'mongoose';

import authSchema from './userAuth';
import userConfigSchema from './userConfig';
import punishmentSchema from './punishment';
import userConnectionSchema from './userConnection';

export default new class User extends Schema {
  constructor() {
    super({
      auth: authSchema,
      config: userConfigSchema,
      id: {type: String, unique: true},
      date_created: {type: Date},
      punishments: punishmentSchema,
      connections: [userConnectionSchema]
    });
  }
}