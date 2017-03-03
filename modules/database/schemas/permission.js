const {Schema} = require('mongoose');

class Permission extends Schema {
  constructor() {
    super({
      name: {type: String, required: true},
      allow: {type: Boolean, required: true}
    });
  }
}

module.exports = new Permission();