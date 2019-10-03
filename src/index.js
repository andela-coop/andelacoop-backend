import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan';

import routes from './routes'

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import routes into application
app.use('/api', routes);

const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);

app.listen(port, () => console.log('Server is runing on port ', port));

export default app;
