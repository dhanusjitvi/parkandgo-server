import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/database.js';
import slotesRoute from './routes/slotesrouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
connectDatabase();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']
}));


app.use(express.json());
app.use('/', slotesRoute);



app.listen(PORT, () => {
    console.log(`Connected to backend! Running port is ${PORT}`);
  });