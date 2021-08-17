const { User } = require('../models');
const sendToken = require('../utils/sendToken');

exports.registerUser = (async (req, res) => {

    const { name, email, departament, password }= req.body;

    const user = await User.create({
        name, 
        email,
        departament,
        password
    })

    sendToken(user, 200, res)
})

exports.updateUser = (async (req, res) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        departament: req.body.departament,
        role: req.body.role
    }

    let user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(404).json({ 
            message: 'User not found'
        })
    }   

    user = await User.update(newUserData, {
                where: { id: req.params.id }
            })

  
    res.status(200).json({
        success: true,
        user
    })
   

    
})


exports.loginUser = (async (req, res) => {

    const { email, password } = req.body;
    
 
    // Checks if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ where: {email}})
    
    if (!user) {
        return res.status(401).json({ 
            message: 'User not found'
        })

    }

    if(! (await user.checkPassword(password))) {
        return res.status(401).json({ 
            message: 'Incorrect password'
        })
    }

    sendToken(user, 200, res)
})

// Router /api/v1/profile/me

exports.profileUser = (async (req, res) => {

    const user = await User.findByPk(req.user.id)


    if (!user) {
        return res.status(401).json({ 
            message: 'User not found'
        })
    }

    res.status(200).json({
        success: true,
        user
    })
})

//CONTROLLERS ADMIN route /api/v1/admin/users

exports.allUsers = (async (req, res) => {

    const users = await User.findAll();

    res.status(200).json({
        success: true,
        users
    })
})



// Router /api/v1/logout

exports.logoutUser = (async (req, res) => {

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})