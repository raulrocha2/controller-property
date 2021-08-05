const router = require('express').Router();
const { 
    newLocal,
    updateLocal,
    getAllLocals,
    getDetailLocal,
    deleteLocal,

 } = require('../controllers/localController');

 const { isAtuthenticated } = require('../middlewares/auth');


router.route('/local/new').post(isAtuthenticated, newLocal);
router.route('/locals').get(getAllLocals);
router.route('/local/:cust_of_center').get(getDetailLocal);
router.route('/local/update/:cust_of_center').put(isAtuthenticated, updateLocal);
router.route('/local/delete/:cust_of_center').delete(isAtuthenticated, deleteLocal);

module.exports = router;