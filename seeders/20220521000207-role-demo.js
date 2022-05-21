'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        role_name: 'principal',
        role_description: 'Can do everything',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'moderator',
        role_description: 'Can manage staff users',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'classManager',
        role_description: 'Can only manage classes',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'studentManager',
        role_description: 'Can only manage students',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'enrollmentsManager',
        role_description: 'Can only manage student enrolls',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role_name: 'instructor',
        role_description: 'Can only manage own classes and their enrollments',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  }
}
