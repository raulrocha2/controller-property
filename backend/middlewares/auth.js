const { User } = require('../models');
const jwt = require('jsonwebtoken');
//const { promisify } = require('util');

//Check user is authenticated
exports.isAtuthenticated = (async (req, res, next) => {

    const {token} = req.cookies

    if (!token) {
        return res.status(401).json({
            message: 'Token not provided'
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findByPk(decoded.id);

    } catch (error) {

        return res.status(401).json({
            message: 'Token invalid'
        })
    }
    
    

    return next();
})