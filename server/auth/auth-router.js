const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
// const Users = require('../users/userModel');
const secrets = require('../config/secret')
// const validation = require('../users/userRouter')
// const db = require("../config/database")
const { pool } = require('../database/connect');
const {
  validateUser,
  isInvalidField,
  generateAuthToken
} = require('../utils/common');
router.post('/register', async (req, res) => {
  try {
  const { email, first_name, last_name, password } = req.body;
  const user = [
    'email',
    'first_name',
    'last_name',
    'password'
  ]
  const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      user
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        signup_error: 'Invalid field.'
      });
    }
    const result = await pool.query(
      'select count(*) as count from users where email=$1',
      [email]
    );
    const count = result.rows[0].count;
    if(count > 0) {
      return res.status(400).send({
        signup_error: 'user with this email already exists'
      });
    }
  const hashedPassword = await bcrypt.hash(password, 8)
   await pool.query(
    "INSERT INTO users ( email, first_name, last_name, password) VALUES ($1, $2, $3, $4)",
    [email, first_name, last_name, hashedPassword]
  );
  res.status(201).json({ message: `Success`});
    } catch(error) {
      res.status(500).json({ message: error.message, stack: error.stack})
    };
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    if (!user) {
      res.status(400).send({
        sigin_error: 'Email/password does not match.'
      });
    }
    const token = await generateAuthToken(user);
    const result = await pool.query(
      'insert into tokens(access_token, userid) values($1,$2) returning *',
      [token, user.userid]
    );
    if (!result.rows[0]) {
      return res.status(400).send({
        signin_error: 'Error while signing in..Try again later.'
      });
    }
    user.token = result.rows[0].access_token;
    res.send(user);
  } catch (error) {
    res.status(400).send({
      signin_error: 'Email/password does not match.'
    });
  }
});


function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    
    } 

    const options = {
      expiresIn: '1d'
    }

    const result = jwt.sign(
      payload,
      secrets.jwtSecret,
      options
    )
    return result;
}
module.exports = router;