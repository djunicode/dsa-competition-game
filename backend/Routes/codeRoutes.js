import { Router } from 'express';
import { runCodePy, runCodeCpp } from '../Controllers/codeRunnerController.js';
const router = Router();

// router.get('/:problemCode', getProblem);

router.post('/:problemId/py', runCodePy);
// Not working in cpp till now 
// router.post('/:problemCode/cpp', runCodeCpp);

export default router;
