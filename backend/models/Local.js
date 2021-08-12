
module.exports = (sequelize, DataTypes) => {
    const Local = sequelize.define("Local", {
        contract: DataTypes.STRING,
        cust_of_center: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN

    })

    Local.associate = function(models) {
        Local.hasMany(models.AllocatedProperty, {
            foreignKey: 'local_id',
            as: 'allocated_locals'
        })
    }

    return Local;
}