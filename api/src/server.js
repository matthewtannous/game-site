import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));