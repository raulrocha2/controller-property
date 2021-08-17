const router = require('express').Router();
const { 
    loginUser, 
    registerUser, 
    profileUser, 
    logoutUser, 
    updateUser,
    allUsers
} = require('../controllers/authController');
const { isAtuthenticated } = require('../middlewares/auth');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile/me').get(isAtuthenticated, profileUser);
router.route('/profile/update/:id').put(isAtuthenticated, updateUser);

//Router ADMIN 
router.route('/admin/users').get(allUsers);

router.route('/logout').get(logoutUser);

module.exports = router;