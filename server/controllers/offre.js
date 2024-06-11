const { where } = require('sequelize');
const { Offre } = require('../models');
const { Company } = require('../models');
const { Op } = require("sequelize");


const createOffer =  async (req, res) => {
    let offre = req.body;
    userid = req.user.data[0];
    if(offre.salaire === 0){
        offre.salaire = "salaire à négocier";
    }
    offre.companyId = userid;
console.log(userid);
        try {
                const user = await Offre.create(offre);
                return res.status(201).json({ message:"Offre créée avec succès"  });
        } catch (error) {
            (error) 
                return res.status(500).json({ message: "une erreur est survenu" })

}

}

const getCompanyAdminOffers =  async (req, res) => {
  let userid = req.user.data[0];
        try {
                const offres = await Offre.findAll({where: {companyId: userid}});
                console.log(offres);
                return res.status(201).json({ offres  });
        } catch (error) {
            (error) 
                return res.status(500).json({ message: "une erreur est survenu" })

}
}

const getCompanyOffers =  async (req, res) => {
    let companyid = req.query.entrepriseid;
          try {
                  const offres = await Offre.findAll({where: {companyId: companyid},
                    include: [{
                        model: Company,
                        as: 'company',
                        attributes: ['name', 'logo' , 'banner']
                    }],});
                  console.log(offres);
                  return res.status(201).json( offres );
          } catch (error) {
              (error) 
                  return res.status(500).json({ message: "une erreur est survenu" })
  
  }
  }

const getOfferAdmin =  async (req, res) => {
    let offreid = req.query.offreid;
    console.log(offreid);
          try {
                  const offres = await Offre.findOne({where: {id: offreid},
                    
                }    
                  );
                  
                  return res.status(201).json({ offres  });
          } catch (error) {
              (error) 
                  return res.status(500).json({ message: "une erreur est survenu" })
  
  }
  }

  const getOffer =  async (req, res) => {
    let offreid = req.query.offreid;
    console.log(offreid);
          try {
                  const offres = await Offre.findOne({where: {id: offreid},
                    include: [{
                        model: Company,
                        as: 'company',
                        attributes: ['name', 'banner']
                    }],});
                  
                  return res.status(201).json({ offres  });
          } catch (error) {
              (error) 
                  return res.status(500).json({ message: "une erreur est survenu" })
  
  }
  }


    const getResearchOffer = async (req, res) => {
        let offre = req.body;
        console.log(offre);
        try {
            const offres = await Offre.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Company,
                    as: 'company',
                    attributes: ['name', 'logo']
                }],
            });
            return res.status(201).json({ offres });
        } catch (error) {
            (error) 
                return res.status(500).json({ message: "une erreur est survenu" })
    
    }
    }

  
        const getFiltredOffer = async (req, res) => {
            let searchConditions = {};
        console.log(req.body);
            // Vérifier si le nom de l'offre est renseigné
            if (req.body.search && req.body.search !== "") {
                searchConditions.name = { [Op.like]: `%${req.body.search}%` };
            }
            if (req.body.domaine && req.body.domaine.length > 0 && req.body.domaine !== "1") {
                searchConditions.domaine = { [Op.like]: req.body.domaine };
            }
            // Vérifier si le salaire est renseigné
            if (req.body.salaire) {
                searchConditions.salaire = { [Op.between]: [req.body.salaire[0], req.body.salaire[1]] };
            }
            if (req.body.contrat && req.body.contrat.length > 0) {
                searchConditions.contrat = { [Op.in]: req.body.contrat };
            }
            if (req.body.télétravail && req.body.télétravail.length > 0) {
                searchConditions.télétravail= { [Op.in]: req.body.télétravail };
            }
            // Effectuer la requête avec toutes les conditions
            const offres = await Offre.findAll({
                order: [['createdAt', 'DESC']],
                include: [{
                    model: Company,
                    as: 'company',
                    attributes: ['name', 'logo']
                }],
                where: searchConditions,
            });
        
            return res.status(201).json({ offres });
        };
    







  const updateOffer = async (req, res) => {
  
    let id = req.body.id;
    console.log(req.body.active)
        try {
          const [updated] = await Offre.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            return res.status(200).json({ message: "mise à jour réussi" });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }  
  
  };
  
  const deleteOffer = async (req, res) => {
    let id = req.body.id;
        try {
          const deleted = await Offre.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).json({ message: "mise à jour réussi" });
        }
    } catch (error) {
        return res.status(500).send(error.message);
    }  
  
  };
  
 const getEmploie = async (req , res) => {
    try {
        const offres = await Offre.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [{
                model: Company,
                as: 'company',
                attributes: ['name', 'logo' , 'banner']
            }],
        });
        if(offres){
        return res.status(201).json({ offres });
        }
    } catch (error) {
        (error) 
            return res.status(500).json({ message: "une erreur est survenu" })
    }
}

const getCatEmploie = async (req , res) => {
    try {
        const offres = await Offre.findAll({
            where: {domaine: req.query.domaine},
            order: [['createdAt', 'DESC']],
            limit: 10,
            include: [{
                model: Company,
                as: 'company',
                attributes: ['name', 'logo' , 'banner']
            }],
        });
        if(offres){
        return res.status(201).json({ offres });
        }
    } catch (error) {
        (error) 
            return res.status(500).json({ message: "une erreur est survenu" })
    }
}
module.exports = {
    createOffer,
    getCompanyOffers,
    getOfferAdmin,
    getOffer,
    updateOffer,
    getResearchOffer,
    deleteOffer,
    getFiltredOffer,
    getEmploie,
    getCatEmploie,
    getCompanyAdminOffers,
}