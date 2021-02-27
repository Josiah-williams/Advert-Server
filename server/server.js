const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const dotenv = require('dotenv');
const advertRouter = require('./adverts/advertRouter')
const authRouter = require('./auth/auth-router');

const userRouter = require('./users/userRouter');

dotenv.config();
const server = express();

server.use(
  cors({
    origin: [
      `${process.env.FRONT_URL}`,
      'http://localhost:3001',
      'http://localhost:3000',
      '*',
    ],
    credentials: true,
  })
);

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)
server.use('/api/adverts', advertRouter)


server.get('/', (req, res) => {
  res.status(200).json('API is working')
});


module.exports = server;