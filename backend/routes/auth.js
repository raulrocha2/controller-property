const router = require('express').Router();
const { loginUser, registerUser, profileUser} = require('../controllers/authController');
const { isAtuthenticated } = require('../middlewares/auth');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile/me').get(isAtuthenticated, profileUser);

module.exports = router;