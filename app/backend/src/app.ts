import * as express from 'express';
import * as cors from 'cors';
import router from './routes';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(ErrorHandler);

export default app;