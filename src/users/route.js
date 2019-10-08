import express from 'express';
import UserController from '.'

const router = express.Router();

router.get('/users', UserController.getAllUser)

export default router;
