import {Schema} from 'mongoose';

export default new class CommunityCpnnection extends Schema {
  constructor() {
    super({
      platform: {type: String, required: true},
      config: {type: Object},
      authData: {type: Object}
    });
  }
}