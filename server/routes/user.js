const { Router } = require('express');
const controllersuser = require('../controllers/user.js');
const controllersexperience = require('../controllers/experiences.js');
const log = require('../controllers/log.js');
const router = Router();
const multer = require('multer');

const upload = multer({ dest: '../frontend/public/uploads' });

router.post('/adduser', upload.fields([{ name: 'photoprofile', maxCount: 1 }, { name: 'cv', maxCount: 1 }]) , controllersuser.createUser),
router.post('/updateuserinfo', log.authenticateJWT , upload.single('cv') , controllersuser.updateUserInfo),
router.post('/updateuser', log.authenticateJWT , controllersuser.updateUser),
router.post('/updateuseremail', log.authenticateJWT , controllersuser.updateUserEmail),
router.post('/updateuserpassword', log.authenticateJWT , controllersuser.updateUserPassword),
router.get('/getuser', log.authenticateJWT , log.GetUser),
router.get('/getcandidatureuser', log.authenticateJWT , controllersuser.getUserCandidature),
router.get('/getuserbyid', log.authenticateJWT , controllersuser.getUserChat),
router.delete('/deleteuser',log.authenticateJWT , controllersuser.deleteUser),
router.post('/createexperience', log.authenticateJWT , controllersexperience.createExperience),
router.get('/getuserexperiences' , log.authenticateJWT , controllersexperience.getExperience),
router.delete('/deleteexperience',log.authenticateJWT , controllersexperience.deleteExperience),
module.exports = router