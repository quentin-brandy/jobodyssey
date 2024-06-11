const { OffreUsers } = require('../models');
const { User } = require('../models');
const { Offre } = require('../models');
const { Company } = require('../models');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');




const postOffreUsers =  async (req, res) => {
    let offre = req.query.offreid;
    let userid = req.user.data[0];

    let query = OffreUsers.create({OffreId: offre, UserId: userid});
    if(query){
       return res.status(201).json({ message:"postuler avec succès"  });
        
    }
    else{
        return res.status(500).json({ message: "une erreur est survenu" });
    }
    
}

const getOffreUsers =  async (req, res) => {
    let offre = req.query.offreid;
    let userid = req.user.data[0];
    let query = await OffreUsers.findOne({where: {OffreId: offre, UserId: userid}});
    console.log(query)
    if(query){
       return res.status(201).json({ message:"trouvé" }); 
    }
    else{
        return res.status(500).json({ message: "introuvable" });
    }
    
}


const delOffreUsers =  async (req, res) => {
    let offre = req.query.offreid;
    let userid = req.user.data[0];
    let query = OffreUsers.destroy({where: {OffreId: offre, UserId: userid}});
    if(query){
       return res.status(201).json({ message:"détruit" }); 
    }
    else{
        return res.status(500).json({ message: "introuvable" });
    }
    
}

const getCandidatures  = async (req, res) => {
    let offre = req.query.offreid;
    let query = await OffreUsers.findAll({where: {OffreId: offre}});
    if(query){
    query = query.map((q) => q.UserId);
    console.log(query)
    let users = await User.findAll({where: {id: query} ,
        include: [{
            model: OffreUsers,
            as: 'offresuser',
            where: {OffreId: offre , UserId: query},
            attributes: ['statut' , 'OffreId'],
        }]});
    console.log(users)
    if(users){
       return res.status(201).json(users); 
    }
    else{
        return res.status(500).json({ message: "introuvable" });
    }
}
else{
    return res.status(201).json({ message: "Aucune offre trouvé" });
}
}

const getCandidatUsers = async (req, res) => {
    let user = req.query.userid;
    console.log(user)
    let query = await OffreUsers.findAll({where: {UserId: user} ,  attributes: ['OffreId' , 'statut'],  include: [{
        model: Offre,
        as: 'offre',
        include: [{
            model: Company,
            as: 'company',
            attributes: ['name', 'logo']
        }]
    } ] });
    console.log(query)  
    let offre = query.map((q) => q.OffreId);
    console.log(offre)
    const offres = await Offre.findAll({where: {id: offre},
        include: [{
            model: Company,
            as: 'company',
            attributes: ['name', 'banner']
        }],});
        console.log(offres)
    if(query){
       return res.status(201).json(query); 
    }
    else{
        return res.status(500).json({ message: "aucun offre" });
    }
}

const acceptCandidatures  = async (req, res) => {
    let user = req.query.userid;
    let offre = req.query.offreid;
    let query = await OffreUsers.findOne({where: {UserId: user , OffreId: offre}});
    if(query){
    let candidature = await OffreUsers.update({statut: "accepté"}, {where: {UserId: user , OffreId: offre}});
     if(candidature){
        return res.status(201).json({ message:"Candidature accepté" }); 
     }
     else{
         return res.status(500).json({ message: "introuvable" });
     }
}
}
const refuseCandidatures  = async (req, res) => {
    let user = req.query.userid;
    let offre = req.query.offreid;
    let query = await OffreUsers.findOne({where: {UserId: user , OffreId: offre}});
    if(query){
    let candidature = await OffreUsers.update({statut: "refusé"}, {where: {UserId: user , OffreId: offre}});
     if(candidature){
        return res.status(201).json({ message:"Candidature refusé" }); 
     }
     else{
         return res.status(500).json({ message: "introuvable" });
     }
}
}
const cancelCandidatures  = async (req, res) => {
    let offre = req.query.offreid;
    let user = req.user.data[0];
    let candidature = await OffreUsers.destroy({where: {UserId: user , OffreId: offre}});
     if(candidature){
        return res.status(201).json({ message:"Candidature supprimé" }); 
     }
     else{
         return res.status(500).json({ message: "introuvable" });
     } 
}
module.exports = {
    postOffreUsers,
    getOffreUsers,
    delOffreUsers,
    getCandidatures,
    getCandidatUsers,
    acceptCandidatures,
    refuseCandidatures,
    cancelCandidatures
   

}