import {Schema} from 'mongoose';

import userSchema from './user';
import rolesSchema from './role';

export default new class StaffMemeber extends Schema {
  constructor() {
    super({
      user: userSchema,
      roles: [rolesSchema],
      superAdmin: Boolean
    });
  }
}