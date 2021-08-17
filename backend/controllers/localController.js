const { Local } = require('../models');

exports.newLocal = (async (req, res) => {

    const existLocal = await Local.findOne({ 
        where: { cust_of_center: req.body.cust_of_center } 
    });

    if (existLocal) {

        return res.status(400).json({ 
            success: false,
            message: 'Local already registered!'
        })

    }
    
    const local = await Local.create(req.body);
    
    res.status(201).json({
        success: true,
        local
    })
});

exports.updateLocal = (async (req, res) => {

    let local = await Local.findOne({ 
                            where: { cust_of_center: req.params.cust_of_center } 
                        });

    if (!local) {
        return res.status(404).json({ 
            message: 'Local not found'
        })
    }   

    local = await Local.update(req.body, {
                where: { cust_of_center: req.params.cust_of_center }
            })

    console.log(local);
    
    res.status(200).json({
        success: true,
        local
    })
   

    
})



exports.getAllLocals = (async (req, res) => {


    const locals = await Local.findAll();

    res.status(200).json({
        success: true,
        locals
    })
})


exports.getDetailLocal = (async (req, res) => {

    const local = await Local.findOne({ 
                            where: { cust_of_center: req.params.cust_of_center } 
                        });

    if (!local) {
        return res.status(404).json({ 
            message: 'Local not found'
        })
    }   

    
    res.status(200).json({
        success: true,
        local
    })
   

    
})


exports.deleteLocal = (async (req, res) => {

    const local = await Local.findOne({ 
                        where: { cust_of_center: req.params.cust_of_center } 
                    });

    if (!local) {
        return res.status(404).json({ 
            message: 'Local not found'
        })
    }   

    await local.destroy();
    
    res.status(200).json({
        success: true,
        message: 'was deleted'
    })
   

    
})