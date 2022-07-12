import { Router } from 'express';
import auth from '../Middleware/auth.js';
import {
  listAllProblems,
  problemByID,
  addProblem,
  updateProblem,
  removeProblem,
  deleteAllProblems,
} from '../Controllers/problemStatController.js';

const router = new Router();

router.get('/allProblems', listAllProblems); // fetching all the problem statements
router.get('/problemById/:_id', problemByID); // fetching the problem according to their IDS
router.post('/addProblem', addProblem); // adding a problem
router.put('/updateProblem/:_id', updateProblem); // updating a problem
router.delete('/deleteProblem/:_id', removeProblem); // deleting a problem
// router.delete('/deleteAll', deleteAllProblems); // deleting a problem
export default router;
