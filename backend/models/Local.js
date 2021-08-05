
module.exports = (sequelize, DataTypes) => {
    const Local = sequelize.define("Local", {
        contract: DataTypes.STRING,
        cust_of_center: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN

    });

    return Local;
}