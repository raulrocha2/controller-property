'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'departament',
      {
        type: sequelize.STRING,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn(
      'users',
      'departament',
      
    );
  }
};
