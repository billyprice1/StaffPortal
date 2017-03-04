import {Schema} from 'mongoose';

export default new class Permission extends Schema {
  constructor() {
    super({
      name: {type: String, required: true},
      allow: {type: Boolean, required: true}
    });
  }
}