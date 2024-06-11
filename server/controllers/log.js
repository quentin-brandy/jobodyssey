const { Company } = require('../models');
const { User } = require('../models');
const { Experience } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const experience = require('../models/experience');
// const secretKey = crypto.randomBytes(64).toString('hex');



const secretKey = 'mysecretkey1234';

const authenticateJWTSocket = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject({ status: 401, message: 'error' });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return reject({ status: 403, message: 'error' });
      }

      resolve(user);
    });
  });
};


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401).json({ message: 'error' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403).json({ message: 'error' });
      req.user = user;
      next();
    });
  };



const Login = async (req, res) => {
    let user = req.body;
  let query = null;
    const Companyuser = await Company.findOne({ where: { email: user.email } });
    console.log(Companyuser);
    if (Companyuser === null) {
      const Useruser = await User.findOne({ where: { email: user.email } });
    console.log(Useruser);
      if (Useruser === null) {
        res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        return;
      }
      else{
         query = Useruser;
         bcrypt.compare(user.password, query.password, function (_, result) {
          if (result) {
            let token = jwt.sign({
              data: [query.id, query.email, query.role]
            }, secretKey, { expiresIn: '1h' });
            res.json({ message: 'Authentification réussie', token: token });
          } else {
            res.status(400).json({ message: 'Email ou mot de passe incorrect' });
          }
        });
      }
    }
    else{
      let query = Companyuser;
      bcrypt.compare(user.password, query.password, function (_, result) {
        if (result) {
          let token = jwt.sign({
            data: [query.id, query.email, query.role]
          }, secretKey, { expiresIn: '8h' });
          res.json({ message: 'Authentification réussie', token: token });
        } else {
          res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }
      });
    }
    }


const GetUser = async (req, res) => {
    let email = req.user.data[1];
    console.log(req.user.data[1]);
    try {
        const user = await Company.findOne({
            where: { email: email },
        });
        if (user) {
            return res.status(200).json({ user });
        }
        else {
            const user = await User.findOne({
                where: { email: email }});

            if (user) {
                return res.status(200).json({ user });
        }
        else{
            return res.status(404).json({ message: 'error' });
        }
    }} catch (error) {
        return res.status(500).json({ message: 'error' });;
    }
}



    module.exports = {
    Login,
    authenticateJWT,
    GetUser,
    authenticateJWTSocket
}

  
  