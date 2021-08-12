'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('allocated_properties', { 

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      property_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'properties',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      local_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'locals',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      description: {
        type: Sequelize.STRING,
        allowNull: true
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
   return queryInterface.dropTable('allocated_properties');
    
 }
};