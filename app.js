import express from 'express';
import items from './routes/items.js';

const app = express();

app.use(express.json());
app.use("/api/account", items);

export default app;