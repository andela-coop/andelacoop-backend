import express from 'express';
import user from '../users/route'

const app = express();

app.use(user)

export default app;
