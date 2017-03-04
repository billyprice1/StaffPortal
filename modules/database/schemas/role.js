import {Schema} from 'mongoose';

import permissionSchema from './permission';

export default new class Role extends Schema {
  constructor() {
    super({
      permissions: [permissionSchema],
      name: {type: String, required: true},
      color: {type: String},
      id: {type: String, unique: true, required: true}
    });
  }
}