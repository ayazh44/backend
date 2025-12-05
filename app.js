import express from 'express';
import account from './routes/account.js';
import pass from './routes/pass.js';
import noteRoutes from './routes/noteRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/account", account);
app.use("/api/password", pass);
app.use("/api/article", articleRoutes);
app.use("/api/note", noteRoutes);

export default app;