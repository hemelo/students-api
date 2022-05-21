'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Role', key: 'id' }
      },
      perm_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Permission', key: 'id' }
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermissions')
  }
}
