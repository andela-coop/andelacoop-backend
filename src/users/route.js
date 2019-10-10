import express from 'express';

import UserValidation from '../middlewares/user';
import UserController from '.';

const router = express.Router();

router.get('/users', UserController.getAllUser);

router.post('/user', UserValidation.createUserValidation, UserController.createUser);

export default router;
