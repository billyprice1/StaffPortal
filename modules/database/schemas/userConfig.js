const {Schema} = require("mongoose");

class UserConfig extends Schema {
  constructor() {
    super({
      username: {type: String, required: true},
      id: {type: String, unique: true, required: true},
      avatar: {type: Buffer},
      email: {type: String, unique: true}
    });
  }
}

module.exports = new UserConfig();