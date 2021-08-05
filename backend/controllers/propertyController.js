const { Property } = require('../models');

exports.newProperty = (async (req, res) => {

    const existProperty = await Property.findOne({ 
                                where: { number: req.body.number } 
                            });

    if (existProperty) {

        return res.status(400).json({ 
            success: false,
            message: 'Property already registered!'
        })

    } 

    const property = await Property.create(req.body);
    res.status(201).json({
        success: true,
        property
    })


    
})


exports.updateProperty = (async (req, res) => {

    let property = await Property.findOne({ 
                            where: { number: req.params.number } 
                        });

    if (!property) {
        return res.status(404).json({ 
            message: 'Property not found'
        })
    }   

    property = await Property.update(req.body, {
        where: { number: req.params.number }
    })
    
    res.status(200).json({
        success: true,
        property
    })
   

    
})



exports.getAllproperties = (async (req, res) => {


    const properties = await Property.findAll();

    res.status(200).json({
        success: true,
        properties
    })
})


exports.getDetailProperty = (async (req, res) => {

    const property = await Property.findOne({ 
                            where: { number: req.params.number } 
                        });

    if (!property) {
        return res.status(404).json({ 
            message: 'Property not found'
        })
    }   

    
    res.status(200).json({
        success: true,
        property
    })
   

    
})


exports.deleteProperty = (async (req, res) => {

    let property = await Property.findOne({ 
                            where: { number: req.params.number } 
                        });

    if (!property) {
        return res.status(404).json({ 
            message: 'Property not found'
        })
    }   

    await property.destroy();
    
    res.status(200).json({
        success: true,
        message: 'was deleted'
    })
   

    
})