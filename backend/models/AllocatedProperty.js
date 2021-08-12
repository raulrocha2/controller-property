

module.exports = (sequelize, DataTypes) => {
    const AllocatedProperty = sequelize.define("AllocatedProperty", {
        description: DataTypes.STRING

    });

    AllocatedProperty.associate = function(models) {
        AllocatedProperty.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'employes'
        })
        AllocatedProperty.belongsTo(models.Property, {
            foreignKey: 'property_id',
            as: 'property'
        })
        AllocatedProperty.belongsTo(models.Local, {
            foreignKey: 'local_id',
            as: 'locals'
        })
    }
    
    return AllocatedProperty;
}