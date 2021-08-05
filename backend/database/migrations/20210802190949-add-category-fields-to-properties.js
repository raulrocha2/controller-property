'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'properties',
      'category',
      {
        type: sequelize.STRING,
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn(
      'properties',
      'category',
      
    );
  }
};
