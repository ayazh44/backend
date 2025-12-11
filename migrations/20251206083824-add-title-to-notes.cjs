'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Notes', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "" // чтобы старые записи не ломались
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Notes', 'title');
  },
};
