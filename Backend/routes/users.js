  const router = require('express').Router();
  const compare = require('bcrypt').compare;
  const { sign } = require('jsonwebtoken');
  const User = require('../models/user.model');

  const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed: Invalid token' });
    }
    req.user = user;
    next();
  });
};

  

  router.get('/',authenticateToken, async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({error: 'Error retrieving users'});
    }
  });

  const genToken = (user) => {
    const payload = {
      username: user.username,
    };
    return sign(payload, process.env.SECRET, { expiresIn: '5d' });
  };

  //Login
  router.post('/login',async(req,res) =>{
    try{
      const {username,password} = req.body;

      const user = await User.findOne({username})

      const token = genToken(user);
      

      if(!user){
        return res.status(401).json({message: 'Username doesn\'t exist \n Register instead'})
      }

      const isMatch = await compare(password,user.password);
      
      if(!isMatch){
        return res.status(401).json({message: 'Invalid Password'})
      }
      else{
        return res.json({status:'Logged in',username,token})
      }
    }
      catch(error){
        res.status(400).json({message:'Error loggin in',error: error.message})
      }
    }
  )

  //Register ======================================================
  router.post('/register', async (req, res) => {

    const user = await User.findOne({
      username: req.body.username
  })

  if(user){
    res.json("Username already exists \n Try Logging in instead")
  }
  else{
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username,password});
    const token = genToken(newUser._id);
    newUser.save()

    .then(() => res.status(200).json({status:'New user registered',username,token}))
    .catch(err => res.status(400).json('Error' + err))
    }
  });
  
    module.exports = router;
