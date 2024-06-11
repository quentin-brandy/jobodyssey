const { Router } = require('express');
const controllerschat = require('../controllers/chat.js');
const log = require('../controllers/log.js');
const router = Router();
const multer = require('multer');

const upload = multer({ dest: '../frontend/public/chats' } , {limits: { fileSize: 15 * 1024 * 1024 }});

router.get('/getchat', log.authenticateJWT , controllerschat.getChat),
router.post('/addchatmessage', log.authenticateJWT , upload.array('files'),  controllerschat.AddChatMessage),
module.exports = router