const mongoose = require("mongoose")

module.exports = new mongoose.Schema({
  username: {type: String, required: true},
  avatar: {type: Buffer},
  email: {type: String, unique: true}
})