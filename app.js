import express from 'express';
import items from './routes/items.js';
import pass from './routes/pass.js';

const app = express();

app.use(express.json());
app.use("/api/account", items);
app.use("/api/password", pass);

export default app;