import { Router } from 'express';
import { runCodePy, runCodeCpp } from '../Controllers/codeRunnerController.js';
const router = Router();

// router.get('/:problemCode', getProblem);

router.post('/:problemCode/py', runCodePy);
router.post('/:problemCode/cpp', runCodeCpp);

export default router;
