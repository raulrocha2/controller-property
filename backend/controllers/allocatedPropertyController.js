const { 
    User, 
    AllocatedProperty,
    Local,
    Property
 } = require('../models');


exports.newAllocated = (async (req, res) => {


    let existProperty = await AllocatedProperty.findOne({
        where: {property_id: req.body.property}
    })

    if (existProperty) {

        return res.status(400).json({ 
            success: false,
            message: 'Property already registered!'
        })
    }

    const allocated = await AllocatedProperty.create({
        description: req.body.description,
        user_id: req.body.user,
        property_id: req.body.property,
        local_id: req.body.local

    })

    await Property.update({is_avaliable: false},{
                            where: { id: allocated.property_id }
                        })


    res.status(201).json({
        success: true,
        allocated
    })
});

exports.getAllocaties = (async (req, res) => {

    const allocated = await AllocatedProperty.findAll();

    res.status(200).json({
        success: true,
        allocated
    })
});

//Get Allocated by Product Number 
exports.getPropertyAllocated = (async (req, res) => {


    const property = await Property.findOne({
                        where: { number: req.params.number }
                })


    if (!property) {

        return res.status(404).json({ 
            message: 'Property no Allocated'
        })
    }

    const allocated = await AllocatedProperty.findAll({
                    where: {property_id: property.id},
                    include: [{
                        model: Property,
                        as: 'property'
                      }]
                })


    if (!allocated) {

        return res.status(404).json({ 
            message: 'Property no Allocated'
        })
    }

            
    res.status(200).json({
        success: true,
        allocated
    })
});


//Get by User Email
exports.getUserAllocated = (async (req, res) => {


    const user = await User.findOne({
                        where: { email: req.params.userEmail }
                })


    if (!user) {

        return res.status(404).json({ 
            message: 'User not has property allocated'
        })
    }

    const allocated = await AllocatedProperty.findAll({
                    where: {user_id: user.id},
                    include: [{
                        model: User,
                        as: 'employes'
                      }]
                })


    if (!allocated) {

        return res.status(404).json({ 
            message: 'User not has property allocated'
        })
    }

            
    res.status(200).json({
        success: true,
        allocated
    })
});


//Get by number of custo center
exports.getLocalAllocated = (async (req, res) => {


    const local = await Local.findOne({
                        where: { cust_of_center: req.params.custOfCenter }
                })


    if (!local) {

        return res.status(404).json({ 
            message: 'Local not has property allocated'
        })
    }

    const allocated = await AllocatedProperty.findAll({
                    where: {local_id: local.id},
                    include: [{
                        model: Local,
                        as: 'locals'
                      }]
                })


    if (!allocated) {

        return res.status(404).json({ 
            message: 'Local not has property allocated'
        })
    }

            
    res.status(200).json({
        success: true,
        allocated
    })
});

exports.deleteAllocated = (async (req, res) => {


    const allocated = await AllocatedProperty.findByPk(req.params.id)


    if (!allocated) {
        return res.status(404).json({ 
            message: 'Allocated not found'
        })
    }

    await allocated.destroy();
   
    await Property.update({is_avaliable: true},{
                            where: { id: allocated.property_id }
                        })

                        
    res.status(201).json({
        success: true,
        message: 'was deleted'
    })
});