import problemStatement from '../Model/problemStatements.js';

// list all the problem statements
const listAllProblems = async (req, res) => {
  try {
    const list = await problemStatement.find();
    res.status(200).json({
      success: true,
      message: 'Heres the list of all the Problems',
      list,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// call the problem by id
const problemByID = async (req, res) => {
  try {
    const problemID = req.body.problemID;
    const showProblem = await problemStatement.findById(problemID);
    res.status(200).json({
      success: true,
      message: 'The problem of given id is given below',
      showProblem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Adding a problemStatement
const addProblem = async (req, res) => {
  try {
    const problemAdd = new problemStatement({
      ...req.body,
    });
    const newProblem = await problemAdd.save();
    res.status(201).json({
      success: true,
      message: 'new problem added successfully',
      newProblem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Updating a problem by its ID
const updateProblem = async (req, res) => {
  try {
    const problemID = req.body.problemID;
    const updateData = {
      ...req.body,
    };
    const found = await problemStatement.findByIdAndUpdate(
      problemID,
      { $set: updateData },
      { omitUndefined: 1 }
    );
    if (!found) {
      res.status(404).json({
        success: false,
        message: 'Problem not found',
      });
    } else {
      res.status(201).json({
        success: true,
        message: 'Problem updated sucessfully',
        updateData,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Deleting a problem by its ID
const removeProblem = async (req, res) => {
  try {
    const problemID = req.body.problemID;
    await problemStatement.findByIdAndDelete(problemID);
    res.status(200).json({
      success: true,
      message: 'Problem removed successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  listAllProblems,
  problemByID,
  addProblem,
  updateProblem,
  removeProblem,
};
