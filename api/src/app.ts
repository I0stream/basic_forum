import express, { NextFunction, Request, Response } from 'express'
import { db } from './models';
import messageRoutes from './routes/messageRoutes';
import userRoutes from './routes/userRoutes';
import threadRoutes from './routes/threadRoutes'
import morgan from 'morgan'

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes

app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/threads', threadRoutes);


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

// Syncing our database
db.sync({ alter: true }).then(() => {
    console.info("connected to the database!")
});

app.listen(3000);