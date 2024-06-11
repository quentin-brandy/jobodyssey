const { Router } = require('express');
const controllersoffer = require('../controllers/offre.js');
const log = require('../controllers/log.js');
const router = Router();



router.get('/getresearchoffers',  controllersoffer.getResearchOffer),
router.post('/getfiltredoffers',  controllersoffer.getFiltredOffer),
router.get('/getcompanyoffers', controllersoffer.getCompanyOffers),
router.post('/addoffer', log.authenticateJWT , controllersoffer.createOffer),
router.get('/getcompanyadminoffers', log.authenticateJWT , controllersoffer.getCompanyAdminOffers),
router.get('/getoffer',  controllersoffer.getOffer),
router.get('/getofferadmin', log.authenticateJWT , controllersoffer.getOfferAdmin),
router.post('/updateoffer',log.authenticateJWT , controllersoffer.updateOffer),
router.delete('/deleteoffer',log.authenticateJWT , controllersoffer.deleteOffer),
router.get('/getofferadmin', log.authenticateJWT , controllersoffer.getOfferAdmin),
router.post('/updateoffer',log.authenticateJWT , controllersoffer.updateOffer),
router.delete('/deleteoffer',log.authenticateJWT , controllersoffer.deleteOffer),
router.get('/getemploie' , controllersoffer.getEmploie),
router.get('/getcatemploie' , controllersoffer.getCatEmploie),
module.exports = router