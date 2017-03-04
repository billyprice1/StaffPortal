import {Schema} from 'mongoose';

export default new class UserConnection extends Schema {
  constructor() {
    super({
      platform: {type: String, required: true},
      userData: {type: Object},
      config: {type: Object}
    });
  }
}