const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {

    const user = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        role: DataTypes.STRING,
        departament: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING
    },

    {
        hooks: {
            beforeSave: async user => {

                if (user.password) {

                    user.password_hash = await bcrypt.hash(user.password, 8)
                }
            }
        }
    }
    );

    // Check Password is Valid
    user.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash)
    }

    //Generate Token JWT
    user.prototype.generateToken = function() {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_TIME
        });
    
    }
    return user;
};