import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/authRoutes';
import listRoutes from './routes/listRoutes';
import taskRoutes from './routes/taskRoutes';
import { deleteList } from './controllers/list.controller';

const app = express();
const port = 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.delete('/lists/list/:id', deleteList)

app.use('/auth', userRoutes);
app.use('/lists', listRoutes);
app.use('/tasks', taskRoutes);


app.listen(port, () => {
  console.log(`app is running at http://localhost${port}`);
});
