
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define("Property", {
        number: DataTypes.STRING,
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        is_avaliable: DataTypes.BOOLEAN,
        photo: DataTypes.BLOB('long')

    })

    Property.associate = function(models) {
        Property.hasMany(models.AllocatedProperty, {
            foreignKey: 'property_id',
            as: 'allocated_properties'
        })
    }

    return Property;
}