import pkg from 'mongoose';
const { Schema, model } = pkg;
import User from './User'

const problemStatementSchema = Schema({
  question: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'hard', 'medium']
  },
});


const problemStatement = model('ProblemStatement', problemStatementSchema);
export default problemStatement;