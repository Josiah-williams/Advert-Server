const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../users/userModel');
const secrets = require('../config/secret')

router.post('/register', validateUser, (req, res) => {
  const { email, first_name, last_name, password, is_admin } = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  const newUser = {
    email,
    first_name,
    last_name,
    password: hash,
    is_admin,
  };

  Users.add(newUser)
  .then(addedUSer => {
    res.status(201).json({
      message: `${addedUSer.first_name} registered successfully`
    })
  })
  .catch(error => {
    res.status(500).json(error.message)
  });
});

router.post('/login', (req, res) => {
  let {email, password} = req.body;
  Users.findBy({ email})
  .first()
  .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.first_name}`,
        token: token
      })
    } else {
      res.status(401).json({
        message: 'Invalid credentials'
      })
    }
  })
})

function validateUser(req, res, next) {
  const addedUser = req.body;
  if (Object.keys(addedUser).length === 0) {
    res.status(400).json({ message: "Invalid inputs" });
  } else if (!addedUser.email) {
    res.status(400).json({ message: "Please enter a valid email" });
  } else if (!addedUser.first_name) {
    res.status(400).json({ message: "Please input your first name" });
  } else if (!addedUser.last_name) {
    res.status(400).json({ message: "Please input your last name" });
  } else if (!addedUser.password) {
    res.status(400).json({ message: "You have not chosen a password" });
  } else if (!addedUser.is_admin) {
    res.status(400).json({ message: "Are you an admin?" });
  } else {
    next();
  }
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email
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