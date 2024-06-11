const { Company } = require('../models');
const { User } = require('../models');
const { Offre } = require('../models');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const secretKey = 'mysecretkey1234';

const createCompany =  async (req, res) => {
    let company = req.body;
console.log(company);

// Vérification de l'existence de l'email
const companies = await Company.findAll();
const checkemail = companies.find(c => c.email === company.email);

console.log(checkemail);
    if (checkemail != undefined) {
      // L'email existe déjà, renvoyer une erreur
      res.status(500).json({ message: "L'email a déjà été utilisé" });
    } else {
      const checkemail = await User.findOne({ where: { email: company.email  } });
if(checkemail != undefined){
  console.log(checkemail)
    res.status(500).json({ message: "L'email a déjà été utilisé" });
} else {
        const files = [req.files.logo[0], req.files.banner[0]];

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
                    company.logo = file.filename + ext;
                  } else {
                    company.banner = file.filename + ext;
                  }
            }
          });
        });
            bcrypt.hash(company.password, saltRounds, async function (err, hash) {
        company.password = hash; 
            console.log(company);
            try {
                const user = await Company.create(company);
                return res.status(201).json({ message:"Company ajoutée avec succès"  });
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
      });
    }   
}
}



const getAllCompany = async (req, res) => {
    try {
        const company = await Company.findAll({
        });
        return res.status(200).json({ company });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getFiltredCompany = async (req, res) => {
  let searchConditions = {};
  console.log(req.body);
      // Vérifier si le nom de l'offre est renseigné
      if (req.body.search && req.body.search !== "") {
          searchConditions.name = { [Op.like]: `%${req.body.search}%` };
      }
      if (req.body.activity && req.body.activity.length > 0 && req.body.activity !== "1") {
          searchConditions.activity = { [Op.like]: req.body.activity };
      }
     
      const company = await Company.findAll({
          order: [['createdAt', 'DESC']],
          where: searchConditions,
      });
      return res.status(201).json({company });
    };


const getCompanyById = async (req, res) => {
  let id = req.query.entrepriseid;  
    try {
        const Entreprise = await Company.findOne({
            where: { id: id },
        });
        if (Entreprise) {
            return res.status(200).json({ Entreprise });
        }
        return res.status(404).send('Entreprise with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getCompanyByOffer = async (req, res) => {
  let offreid = req.query.offerid;  
    try {
        const Entreprise = await Offre.findOne({where: { id: offreid } , attributes:[], include: [{ model: Company, as: 'company' , attributes: ['logo' , 'name' , 'id']} ,]});
        if (Entreprise) {
            return res.status(200).json( Entreprise );
        }
        return res.status(404).send('Entreprise with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



const updateCompany = async (req, res) => {
  
  
  console.log(req.body);
  let id = req.user.data[0];
  const query = await Company.findOne({ where: { id: id } });
if (query === null) {
  res.status(400).json({ message: 'Problème lors de la récupération de l utilisateur' });
  return;
}
      try {
        const [updated] = await Company.update(req.body, {
          where: { id: id }
      });
      if (updated) {
          return res.status(200).json({ message: "mise à jour réussi" });
      }
  } catch (error) {
      return res.status(500).send(error.message);
  }  

};






const updateCompanyEmail = async (req, res) => {
    try {
        let user = req.body;
        
        console.log(req.body);
        let id = req.user.data[0];
        const query = await Company.findOne({ where: { id: id } });
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
      const email = await Company.findOne({ where: { email: req.body.email  } });
      if(email) {
          return res.status(500).json({ message: "L'email a déjà été utilisé" });
      }

        const [updated] = await Company.update({ email: req.body.email }, {
            where: { id: id }
        });
        if (updated) {
            return res.status(200).json({ message: "mise à jour réussi" });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }
};




const updateCompanyPassword = async (req, res) => {
  
      let user = req.body;
      
      console.log(req.body);
      let id = req.user.data[0];
      const query = await Company.findOne({ where: { id: id } });
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
            const [updated] = await Company.update({password: user.password}, {
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







const updateCompanyLogo = async (req, res) => {
    try {
      let id = req.user.data[0];
   
      const file = req.file;
      console.log(req.file);
      const ext = path.extname(file.originalname);
      const newPath = path.join('../frontend/public/', 'uploads', file.filename + ext);
  
      fs.rename(file.path, newPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Problème avec le fichier' });
        }
        const company = await Company.findOne({ where: { id: id } });
        const oldLogo = company.logo;
    console.log(oldLogo);
        if (oldLogo) {
          const oldPath = path.join('../frontend/public/', 'uploads', oldLogo);
          fs.unlinkSync(oldPath);
        }
        let logo = file.filename + ext;
        const updated = await Company.update({ logo }, {
          where: { id: id }
        });
  
        if (updated) {
          return res.status(200).json({ message: "mise à jour réussis" });
        }
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };    


  const updateCompanyBanner = async (req, res) => {
    try {
      let id = req.user.data[0];
   
      const file = req.file;
      console.log(req.file);
      const ext = path.extname(file.originalname);
      const newPath = path.join('../frontend/public/', 'uploads', file.filename + ext);
  
      fs.rename(file.path, newPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Problème avec le fichier' });
        }
        const company = await Company.findOne({ where: { id: id } });
        const oldBanner = company.banner;
    console.log(oldBanner);
        if (oldBanner) {
          const oldPath = path.join('../frontend/public/', 'uploads', oldBanner);
          fs.unlinkSync(oldPath);
        }
        let banner = file.filename + ext;
        const updated = await Company.update({ banner: banner }, {
          where: { id: id }
        });
  
        if (updated) {
          return res.status(200).json({ message: "mise à jour réussis" });
        }
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };    


const deleteCompany = async (req, res) => {
    try {
      let id = req.user.data[0];
      console.log(id);
      const company = await Company.findOne({ where: { id: id } });
      const logo = company.logo;
      const banner = company.banner;
      const logopath = path.join('../frontend/public/', 'uploads', logo);
      fs.unlinkSync(logopath);
      const bannerpath = path.join('../frontend/public/', 'uploads', banner);
      fs.unlinkSync(bannerpath);
        const deleted = await Company.destroy({
            where: { id: id }
        });
        if (deleted) {
          return res.status(200).json({ message: "suppresion réussit" });
        }
        throw new Error("Company not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getPartCompany = async (req, res) => {
  let id = req.query.entrepriseid;  
    try {
        const Entreprise = await Company.findAll({
            where: { partenaire: 1 },
        });
        if (Entreprise) {
            return res.status(200).json(Entreprise );
        }
        return res.status(404).send('Entreprise with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}




module.exports = {
    createCompany,
    getAllCompany,
    getCompanyById,
    updateCompanyEmail,
    updateCompanyPassword,
    updateCompanyLogo,
    updateCompanyBanner,
    updateCompany,
    deleteCompany,
    getFiltredCompany,
    getPartCompany,
    getCompanyByOffer
 
   
}