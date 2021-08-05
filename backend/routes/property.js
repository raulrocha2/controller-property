const router = require('express').Router();
const { 
    newProperty, 
    updateProperty, 
    getAllproperties,
    getDetailProperty,
    deleteProperty
} = require('../controllers/propertyController');

const { isAtuthenticated } = require('../middlewares/auth');


router.route('/property/new').post(isAtuthenticated, newProperty);
router.route('/property/update/:number').put(isAtuthenticated, updateProperty);
router.route('/properties').get(getAllproperties);
router.route('/property/detail/:number').get(getDetailProperty);
router.route('/property/delete/:number').delete(isAtuthenticated, deleteProperty);

module.exports = router;