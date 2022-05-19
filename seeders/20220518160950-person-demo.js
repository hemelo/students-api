'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [
      {
        name: 'Ana',
        active: true,
        email: 'ana@gmail.com',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mark',
        active: true,
        email: 'mark@gmail.com',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Felipe',
        active: true,
        email: 'felipe@gmail.com',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jackson',
        active: false,
        email: 'jackson@gmail.com',
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John',
        active: true,
        email: 'john@gmail.com',
        role: 'instructor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Paul',
        active: true,
        email: 'paul@gmail.com',
        role: 'instructor',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {})
  }
}
