'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'role_id', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'Role', key: 'id' }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'role_id')
  }
}
