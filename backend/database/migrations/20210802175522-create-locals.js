'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('locals', { 

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      contract: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },

      cust_of_center: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_active: {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: true
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
   return queryInterface.dropTable('locals');
    
 }
};