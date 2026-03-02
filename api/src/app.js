import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import methodOverride from 'method-override';

import { healthCheck } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config();

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(express.json());

app.use(cors());

app.get('/health', async (req, res) => {
    try {
        res.json({ ok: await healthCheck() });
    } catch (e) {
        res.status(500).json({ ok: false });
    }
});

app.get("/", async (req, res) => {
    res.status(200).send("OKKKKKK");
})

app.use(errorHandler)
