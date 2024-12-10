import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      'https://to-do-list-stoix-challenge-tphk.vercel.app', 
      'http://localhost:3000', 
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));

import taskRoutes from './routes/taskRoutes';
app.use('/api/tasks', taskRoutes);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const PORT = parseInt(process.env.PORT || "10000", 10);
app.listen(PORT, "0.0.0.0", () => console.log(`Servidor rodando na porta ${PORT}`));
