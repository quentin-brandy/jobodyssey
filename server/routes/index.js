const { Router } = require('express');
const controllerscompany = require('../controllers/company.js');
const controllersoffer = require('../controllers/offre.js');
const controllersuser = require('../controllers/user.js');
const controllersexperience = require('../controllers/experiences.js');
const controllersoffreusers = require('../controllers/offreusers.js');
const log = require('../controllers/log.js');
const router = Router();
const multer = require('multer');




const upload = multer({ dest: '../frontend/public/uploads' });

router.get('/', (req,res) => res.send('This is root!'))
router.post('/login', log.Login),
module.exports = router