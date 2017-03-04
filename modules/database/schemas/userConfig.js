import {Schema} from 'mongoose';

export default new class UserConfig extends Schema {
  constructor() {
    super({
      username: {type: String, required: true},
      id: {type: String, unique: true, required: true},
      avatar: {type: Buffer},
      email: {type: String, unique: true}
    });
  }
}