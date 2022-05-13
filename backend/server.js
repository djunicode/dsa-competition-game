import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { serve, setup } from 'swagger-ui-express';
import yaml from 'yamljs';
import redis from 'socket.io-redis';
const swaggerJsDocs = yaml.load('./api.yaml');
import cors from 'cors';
import cookieSession from 'cookie-session';
import './Model/passport.js';
import './config/db.js';
import './config/githubAuthConfig.js';
import oauthRoutes from './Routes/oauthRoutes.js';
import githubAuthRoutes from './Routes/githubAuthRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import codeRoutes from './Routes/codeRoutes.js';
import problemRoutes from './Routes/problemStatRoutes.js';
import roomEvents from './events/roomEvents.js';
import scoreEvents from './events/scoreEvents.js';
import gameEvents from './events/gameEvents.js';
import redisClient from './config/redis.js';

const app = express();
app.use(cookieSession({ name: 'auth-session', keys: ['key1', 'key2'] }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
app.use(oauthRoutes);
app.use('/api/user', githubAuthRoutes);
app.use('/api/user', userRoutes);
app.use('/code', codeRoutes);
app.use('/docs', serve, setup(swaggerJsDocs));
app.use('/problems', problemRoutes);
app.get('/', (req, res) => {
  res.status(200).json({ name: 'Anish' });
});

const port = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.adapter(redis({ host: '127.0.0.1', port: 6379 }));

io.on('connection', (socket, req) => {
  console.log('A user connected');
  // console.log(req.user);
  socket.data = { userId: '1234' }; // replace with req.user
  roomEvents(socket, io, redisClient);
  scoreEvents(socket, io, redisClient);
  gameEvents(socket, io, redisClient);
});

httpServer.listen(port, () => {
  console.log(
    `Server is up and running at port ${port}\nURL: http://localhost:${port}/`
  );
});
