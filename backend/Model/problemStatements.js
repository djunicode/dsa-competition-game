import pkg from 'mongoose';
const { Schema, model } = pkg;
<<<<<<< HEAD
import User from './User';
=======
import User from './User'
>>>>>>> 1b1f3e064f7ea188d775c10fe54ff49d20c1968f

const problemStatementSchema = Schema({
  title: {
    type: String,
    required: true,
<<<<<<< HEAD
  },
  description: {
    type: String,
    required: true,
  },
  inputs: [
    {
      type: String,
      required: true,
    },
  ],
  outputs: [
    {
      type: String,
      required: true,
    },
  ],
  testcases: [
    {
      type: String,
      required: true,
    },
  ],
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'hard', 'medium'],
  },
});

const problemStatement = model('ProblemStatement', problemStatementSchema);
export default problemStatement;
=======
  }, 
  description: {
    type: String,
    required: true,
  }, 
  inputs: [{
    type: String,
    required: true,
  }], 
  outputs: [{
    type: String,
    required: true,
  }], 
  testcases: [{
    type: String,
    required: true,
  }],
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'hard', 'medium']
  },
});


const problemStatement = model('ProblemStatement', problemStatementSchema);
export default problemStatement;
>>>>>>> 1b1f3e064f7ea188d775c10fe54ff49d20c1968f
