import express from 'express';

import signupValidation from '../middlewares/signup';
import SignupController from '.';

const router = express.Router();

router.post('/signup', signupValidation.registerAccountValidation, SignupController.registerAccount);

export default router;
