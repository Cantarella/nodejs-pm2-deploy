import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import errorHandler from './middlewares/error-handler';
import { DB_ADDRESS } from './config';
import router from "./routes";
import routes from './routes';

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS);


app.use(cors({
  origin: [
    'http://cantarella.nomoredomainswork.ru',
    'http://cantarella.nomoredomainswork.ru/',
    'https://cantarella.nomoredomainswork.ru',
    'https://cantarella.nomoredomainswork.ru/'
  ]
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errors());
app.use(errorHandler);
app.use('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('ok'));
