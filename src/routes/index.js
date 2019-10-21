import express from 'express';
import user from '../users/route';
import signup from '../signup/route';

const app = express();

app.use(user);
app.use(signup);

export default app;
