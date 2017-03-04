import {Schema} from 'mongoose';

const UserAuth = {
  hash: {type: String, required: true, min: 8},
  salt: {type: String, required: true, length: 10},
  iterations: {type: Number, required: true}
}

export default UserAuth;