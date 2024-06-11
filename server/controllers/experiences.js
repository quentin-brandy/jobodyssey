const { where } = require('sequelize');
const { Experience } = require('../models');



const createExperience =  async (req, res) => {

console.log(req.user.data[0]);

let userid = req.user.data[0];
 req.body.userId = userid;
 console.log(req.body);

try {
    const experience = await Experience.create(req.body);
    return res.status(201).json({ message:"Experience created successfully"  });

}
catch (error) {
    return res.status(500).json({ message: "une erreur est apparut lors de la création" })

}
}

const getExperience =  async (req, res) => {

    console.log(req.user.data[0]);
    
    let userid = req.user.data[0];
     req.body.userId = userid;
     console.log(req.body);
    
    try {
        const experience = await Experience.findAll({where: { userId: userid }});
        return res.status(201).json(experience);
    
    }
    catch (error) {
        return res.status(500).json({ message: "une erreur est apparut lors de la récupération des données" })
    
    }
    
    }

const deleteExperience = async (req, res) => {
    console.log(req.query.experience);
    try {
        const experience = await Experience.destroy({where: { id: req.query.experience }});
        return res.status(201).json({ message: "Experience deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "une erreur est apparut lors de la suppression" })
    }
}

module.exports = {
createExperience,
getExperience,
deleteExperience
}