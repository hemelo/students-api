'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Permissions', [
      {
        perm_name: 'delete',
        perm_description: 'Can delete something',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'restore',
        perm_description: 'Can restore something',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'update',
        perm_description: 'Can update something',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'create',
        perm_description: 'Can create something',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'toggle',
        perm_description: 'Can disable/active something',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        perm_name: 'show',
        perm_description: 'Can see ',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Permissions', null, {})
  }
}
