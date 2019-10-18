import express from 'express';
import user from '../users/route';
import account from '../accounts/route';

const app = express();

app.use(user);
app.use(account);

export default app;
