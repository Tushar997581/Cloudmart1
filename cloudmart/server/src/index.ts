import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import apiRoutes from './routes/api';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`CloudMart Server running on port ${config.port}`);
});