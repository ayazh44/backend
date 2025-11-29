import express from 'express';
import account from './routes/account.js';
import pass from './routes/pass.js';

const app = express();

app.use(express.json());
app.use("/api/account", account);
app.use("/api/password", pass);

export default app;