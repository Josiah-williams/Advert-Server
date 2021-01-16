const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./auth/auth-router');

const userRouter = require('./users/userRouter');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)

server.get('/', (req, res) => {
  res.status(200).json('API is working')
});


module.exports = server;