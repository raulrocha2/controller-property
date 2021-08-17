const router = require('express').Router();
const { 
    newAllocated, 
    getAllocaties,
    getPropertyAllocated,
    getUserAllocated,
    getLocalAllocated,
    deleteAllocated
} = require('../controllers/allocatedPropertyController');

const { isAtuthenticated } = require('../middlewares/auth');

router.route('/allocated/new').post(newAllocated);
router.route('/allocaties').get(getAllocaties);
router.route('/allocated/property/:number').get(getPropertyAllocated);
router.route('/allocated/user/:userEmail').get(getUserAllocated);
router.route('/allocated/local/:custOfCenter').get(getLocalAllocated);
router.route('/allocated/delete/:id').delete(deleteAllocated);


module.exports = router;