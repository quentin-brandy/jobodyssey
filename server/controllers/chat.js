const { Company } = require('../models');
const { User } = require('../models');
const { Offre } = require('../models');
const { Chat } = require('../models');
const { Op, where } = require("sequelize");
const fs = require('fs');
const path = require('path');


const getChat = async (req , res) => {
    let offreid = req.query.offreid;
    let userid = req.query.userid;
    let entrepriseid = req.query.entrepriseid;
    try {
        let messages = await Chat.findAll({
            where: { userId: userid , companyId: entrepriseid ,  offreId: offreid }});
            if (messages.length === 0) {
                return res.status(400).json({ message: "pas de messages" });
            } else {
                return res.status(201).json(messages);
            }
            }
     catch (error) {
        return res.status(500).json({ message: "une erreur est apparut lors de la récupération des données" })
    }

}

const getChatSocket = async (offreid , userid , entrepriseid) => {
    try {
        let messages = await Chat.findAll({
            where: { userId: userid , companyId: entrepriseid ,  offreId: offreid }});
            if (messages.length === 0) {
                return { message: "pas de messages" };
            } else {
                return (messages);
            }
            }
     catch (error) {
        return { message: "une erreur est apparut lors de la récupération des données" }
    }

}


const AddChatMessage = async (req , res) => {
    console.log(req);
    let files = req.files;
    req.body.file = []
    try {
        await Promise.all(
          files.map(async (file) => {
            const ext = path.extname(file.originalname);
            const newPath = path.join('../frontend/public/', 'chats', file.filename + ext);
    
            await new Promise((resolve, reject) => {
              fs.rename(file.path, newPath, (err) => {
                if (err) {
                  console.error(err);
                  reject('Problème avec le fichier');
                } else {
                  req.body.file.push(( file.filename + ext ));
                  resolve();
                }
              });
            });
          })
        );
        } catch (error) {
            return res.status(500).json({ message: "une erreur est apparut lors de l'envoi du message" });
        }
    try {
        console.log(req.body);
        console.log(req.body.file[0]);
       if(req.body.file[0] !== null){
        req.body.file1 = req.body.file[0];
         }
        if(req.body.file[1] !== null){
        req.body.file2 = req.body.file[1];
        }
        if(req.body.file[2] !== null){
        req.body.file3 = req.body.file[2];
        }
          console.log(req.body);
        let newChat = await Chat.create(req.body);
        if (newChat) {
            return res.status(201).json({ message: "message envoyé" });
        }
    } catch (error) {
        return res.status(500).json({ message: "une erreur est apparut lors de l'envoi du message" });
    }

}


module.exports = {
getChat,
getChatSocket,
AddChatMessage

}