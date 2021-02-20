const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../users/userModel');
const secrets = require('../config/secret')
const validation = require('../users/userRouter')

router.post('/register', validation, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

 

  Users.add(user)
  .then(addedUSer => {
    res.status(201).json({
      message: `${addedUSer.first_name} registered successfully`
    })
  })
  .catch(error => {
    res.status(500).json(error.message)
  });
});

router.post('/login',validation, (req, res) => {
  let {email, password} = req.body;
  Users.findBy({ email })
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
  .catch((error) => {
    res.status(500).json({
      message: `Error login in, check your details or register`,
      stack: error.stack,
    });
  });
})


function generateToken(user) {
  const payload = {
    subject: user.id,
    email: user.email,
    is_admin: member.is_admin,
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