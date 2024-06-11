const { User } = require('../models');
const { Company } = require('../models');
const {Experience} = require('../models');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const e = require('express');
const user = require('../models/user');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

const secretKey = 'mysecretkey1234';



const createUser =  async (req, res) => {
    let user = req.body;
console.log(user);
console.log(req.files);

const checkemail = await User.findOne({ where: { email: user.email  } });

console.log(checkemail);
    if (checkemail != undefined) {
      // L'email existe déjà, renvoyer une erreur
      res.status(500).json({ message: "L'email a déjà été utilisé" });
    } else {
        const checkemail = await User.findOne({ where: { email: user.email  } });
if(checkemail != undefined){
    res.status(500).json({ message: "L'email a déjà été utilisé" });
} else {
  const files = [req.files.photoprofile[0], req.files.cv[0]];
        files.forEach((file , index) => {
          const ext = path.extname(file.originalname);
          const newPath = path.join('../frontend/public/', 'uploads', file.filename + ext);
      
          fs.rename(file.path, newPath, (err) => {
            if (err) {
              console.error(err);
              res.status(500).json({ message: 'Problème avec le fichier' });
              return;
            }
            else{
                if (index === 0) {
                    user.photoprofile = file.filename + ext;
                  } else {
                    user.cv = file.filename + ext;
                  }
            }
          });
        });
            bcrypt.hash(user.password, saltRounds, async function (err, hash) {
        user.password = hash; 
            console.log(user);
            try {
                const users = await User.create(user);
                return res.status(201).json({ message:"Utilisateur ajoutée avec succès"  });
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
      });
      
}
}
}

const updateUserInfo = async (req, res) => {
    let userinfo = req.body;
    let userid = req.user.data[0];
    const file = req.file;
    if(file === undefined){
        const updated = await User.update( userinfo , {
            where: { id: userid }
          });
          if (updated) {
            return res.status(200).json({ message: "mise à jour réussis" });
          }
    }
    else {

   
    try {
      const ext = path.extname(file.originalname);
      const newPath = path.join('../frontend/public/', 'uploads', file.filename + ext);
  
      fs.rename(file.path, newPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Problème avec le fichier' });
        }
        const user = await User.findOne({ where: { id: userid } });
        const oldCV = user.cv;
    console.log(oldCV);
        if (oldCV) {
          const oldPath = path.join('../frontend/public/', 'uploads', oldCV);
          fs.unlinkSync(oldPath);
        }
        let cvname = file.filename + ext;
        userinfo.cv = cvname;
        console.log(userinfo)
        const updated = await User.update( userinfo , {
          where: { id: userid }
        });
  
        if (updated) {
          return res.status(200).json({ message: "mise à jour réussis" });
        }
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}


const updateUser = async (req, res) => {
  
  console.log(req.body);
  let id = req.user.data[0];
  const query = await User.findOne({ where: { id: id } });
if (query === null) {
  res.status(400).json({ message: 'Problème lors de la récupération de l utilisateur' });
  return;
}


      try {
        const [updated] = await User.update(req.body, {
          where: { id: id }
      });
      if (updated) {
          return res.status(200).json({ message: "mise à jour réussi" });
      }
  } catch (error) {
      return res.status(500).send(error.message);
  }  

};


const updateUserEmail = async (req, res) => {
  try {
      let user = req.body;
      
      console.log(req.body);
      let id = req.user.data[0];
      const query = await User.findOne({ where: { id: id } });
  if (query === null) {
      res.status(400).json({ message: 'Problème lors de la récupération de l utilisateur' });
      return;
    }
  else {
      bcrypt.compare(user.password, query.password, function (err, result) {
          if (result) {
          } else {
            res.status(400).json({ message: 'Erreur mot de passe' });
          }
        });
      }
    const emailuser = await User.findOne({ where: { email: req.body.email  } });
    if(emailuser) {
        return res.status(500).json({ message: "L'email a déjà été utilisé" });
    }
      const emailcompany = await Company.findOne({ where: { email: req.body.email  } });
      if(emailcompany) {
          return res.status(500).json({ message: "L'email a déjà été utilisé" });
      }
      const [updated] = await User.update({ email: req.body.email }, {
          where: { id: id }
      });
      if (updated) {
        let newuser = await User.findOne({ where: { id: id } });
        let token = jwt.sign({
          data: [newuser.id, newuser.email, newuser.role]
        }, secretKey, { expiresIn: '1h' });
          return res.status(200).json({ message: "mise à jour réussi" , token: token});
      }
  } catch (error) {
      return res.status(500).send(error.message);
  }
};




const updateUserPassword = async (req, res) => {

    let user = req.body;
    
    console.log(user);
    let id = req.user.data[0];
    const query = await User.findOne({ where: { id: id } });
if (query === null) {
    res.status(400).json({ message: 'Problème lors de la récupération de l utilisateur' });
    return;
  }
else {
    bcrypt.compare(user.oldpassword, query.password, function (err, result) {
        if (result) {
        } else {
          res.status(400).json({ message: 'Erreur mot de passe' });
        }
      });
    }
    bcrypt.hash(user.password, saltRounds, async function (err, hash) {
        user.password = hash;
        console.log(req.body.password);
        try {
          const [updated] = await User.update({password: user.password}, {
            where: { id: id }
        });
        if (updated) {
            return res.status(200).json({ message: "mise à jour réussi" });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }  
    });

};

const deleteUser = async (req, res) => {
  try {
    let id = req.user.data[0];
    console.log(id);
    const user = await User.findOne({ where: { id: id } });
    const cv = user.cv;
    const photoprofile = user.photoprofile;
    const cvpath = path.join('../frontend/public/', 'uploads', cv);
    fs.unlinkSync(cvpath);
    const photoprofilepath = path.join('../frontend/public/', 'uploads', photoprofile);
    fs.unlinkSync(photoprofilepath);
      const deleted = await User.destroy({
          where: { id: id }
      });
      if (deleted) {
        return res.status(200).json({ message: "suppresion réussit" });
      }
      throw new Error("User not found");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const getUserCandidature = async (req, res) => {
  let userid = req.query.userid;
  const user = await User.findOne({ where: { id: userid },
  include: [{
    model: Experience,
    as: 'experiences',
    where: { userId: userid },
    required: false}]});
   
    console.log(user)
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(500).json({ message: "Utilisateur introuvable" });
}

const getUserChat = async (req, res) => {
  let userid = req.query.userid;
  const user = await User.findOne({ where: { id: userid } , attributes: ['id', 'nom','prenom','photoprofile' , 'role']});
  if (user) {
    return res.status(200).json( user );
  }
  return res.status(500).json({ message: "Utilisateur introuvable" });
}



module.exports = {
    createUser,
    updateUserInfo,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser,
    getUserCandidature,
    getUserChat
}