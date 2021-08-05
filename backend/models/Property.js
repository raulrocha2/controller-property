
module.exports = (sequelize, DataTypes) => {
    const Property = sequelize.define("Property", {
        number: DataTypes.STRING,
        brand: DataTypes.STRING,
        model: DataTypes.STRING,
        description: DataTypes.STRING,
        category: DataTypes.STRING,
        is_avaliable: DataTypes.BOOLEAN,
        photo: DataTypes.BLOB('long')

    });

    return Property;
}