import pkg from 'mongoose';
const { Schema, model } = pkg;
import User from './User'

const roomSchema = Schema({
  hash: {
    type: Number,
    required: true,
    unique: true,
  },
  maxUsers: {
    type: Number,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      username: {
        type: String,
      }
      ref: 'User',
    },
  ],
  problemStatement: {
    type: String,
    required: true,
  }
});


const Room = model('Room', roomSchema);
export default Room;