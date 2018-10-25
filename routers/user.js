const router = require('express').Router();
const controller = require('../controllers/user');

router.get('/me',controller.getUserInfo);
router.post('/signin',controller.signin);
router.post('/signup',controller.signup);


module.exports = router;