import { Router } from 'express';
import auth from '../Middleware/auth.js';
import {
  listAllProblems,
  problemByID,
  addProblem,
  updateProblem,
  removeProblem,
} from '../Controllers/problemStatController.js';

const router = new Router();

router.get('/allProblems', listAllProblems); // fetching all the problem statements
router.get('/problemById', problemByID); // fetching the problem according to their IDS
router.post('/addProblem', addProblem); // adding a problem
router.put('/updateProblem', updateProblem); // updating a problem
router.delete('/deleteProblem', removeProblem); // deleting a problem
export default router;
