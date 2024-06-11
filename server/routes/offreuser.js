const { Router } = require('express');
const controllersoffreusers = require('../controllers/offreusers.js');
const log = require('../controllers/log.js');
const router = Router();


router.post('/offrepostuler', log.authenticateJWT , controllersoffreusers.postOffreUsers),
router.get('/getoffreusers', log.authenticateJWT , controllersoffreusers.getOffreUsers),
router.delete('/deloffreusers', log.authenticateJWT , controllersoffreusers.delOffreUsers),
router.get('/getcandidatures' , log.authenticateJWT , controllersoffreusers.getCandidatures)
router.get('/getusercandidatures', controllersoffreusers.getCandidatUsers),
router.get('/refusecandidatures' , log.authenticateJWT , controllersoffreusers.refuseCandidatures),
router.get('/acceptcandidatures' , log.authenticateJWT , controllersoffreusers.acceptCandidatures),
router.get('/cancelcandidatures' , log.authenticateJWT , controllersoffreusers.cancelCandidatures),



module.exports = router