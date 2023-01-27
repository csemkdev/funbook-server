const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/registersendmail', authController.registerSendMail);
router.post('/activation', authController.activateEmail);
router.post('/login', authController.login);
router.post('/forgot', authController.forgotPassword);
// router.post('/reset', authMiddleware, authController.resetPassword);
router.post('/logout', authController.logout);
router.post('/refresh_token', authController.generateAccessToken);

router.post('/forgotsendmail', authController.forgotPassSendMail);
router.post('/forgototpverify', authController.forgotPassOTPVerify);
router.post('/reset', authController.resetPassword);


module.exports = router;
