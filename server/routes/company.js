const { Router } = require('express');
const controllerscompany = require('../controllers/company.js');
const log = require('../controllers/log.js');
const router = Router();
const multer = require('multer');

const upload = multer({ dest: '../frontend/public/uploads' });

router.post('/addcompany', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'banner', maxCount: 1 }]) , controllerscompany.createCompany),
router.get('/getcompanies', controllerscompany.getAllCompany),
router.post('/getfiltredcompany', controllerscompany.getFiltredCompany),
router.get('/getcompany', controllerscompany.getCompanyById),
router.get('/getcompanybyoffer', log.authenticateJWT , controllerscompany.getCompanyByOffer),
router.get('/getpartcompany', controllerscompany.getPartCompany),
router.post('/updatecompany',log.authenticateJWT , controllerscompany.updateCompany),
router.post('/updatecompanyemail',log.authenticateJWT , controllerscompany.updateCompanyEmail),
router.post('/updatecompanypassword',log.authenticateJWT , controllerscompany.updateCompanyPassword),
router.post('/updatecompanylogo',log.authenticateJWT , upload.single('logo'), controllerscompany.updateCompanyLogo),
router.post('/updatecompanybanner',log.authenticateJWT , upload.single('banner'), controllerscompany.updateCompanyBanner),
router.delete('/deletecompany',log.authenticateJWT , controllerscompany.deleteCompany),

module.exports = router