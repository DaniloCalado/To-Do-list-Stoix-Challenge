import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://to-do-list-stoix-challenge-tphk.vercel.app",
  "https://to-do-list-stoix-challenge.onrender.com",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow access from this origin"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-CSRF-Token', 'Authorization'],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain: process.env.COOKIE_DOMAIN || 'to-do-list-stoix-challenge.onrender.com',
  },
});

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

import taskRoutes from './routes/taskRoutes';
app.use('/api/tasks', taskRoutes);

const PORT = parseInt(process.env.PORT || "10000", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
