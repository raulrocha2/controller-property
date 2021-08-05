'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('properties', { 

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      brand: {
        type: Sequelize.STRING,
      },

      model: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.STRING,
      },

      is_avaliable: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
      },

      photo: {
        type: Sequelize.BLOB,
      },

      created_at: {
       type: Sequelize.DATE,
       allowNull: false,
     },
     
     updated_at: {
       type: Sequelize.DATE,
       allowNull: false,
     },

     });
 },

 down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable('properties');
    
 }
};