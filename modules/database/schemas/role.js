const {Schema} = require('mongoose');

const permissionSchema = require('./permission');

class Role extends Schema {
  constructor() {
    super({
      permissions: [permissionSchema],
      name: {type: String, required: true},
      color: {type: String},
      id: {type: String, unique: true, required: true}
    });
  }
}

module.exports = new Role();