import express from 'express';

import AccountValidation from '../middlewares/account';
import AccountController from '.';

const router = express.Router();

router.get('/accounts', AccountValidation.createAccountValidation, AccountController.createAccount);

export default router;
