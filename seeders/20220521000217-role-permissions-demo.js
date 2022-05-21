'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('RolePermissions', [
      {
        role_id: 1,
        perm_id: 1
      },
      {
        role_id: 1,
        perm_id: 2
      },
      {
        role_id: 1,
        perm_id: 3
      },
      {
        role_id: 1,
        perm_id: 4
      },
      {
        role_id: 1,
        perm_id: 5
      },
      {
        role_id: 1,
        perm_id: 6
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RolePermissions', null, {})
  }
}
