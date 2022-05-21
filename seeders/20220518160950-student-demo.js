'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Students', [
      {
        name: 'Ana',
        active: true,
        email: 'ana@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mark',
        active: true,
        email: 'mark@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Felipe',
        active: true,
        email: 'felipe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jackson',
        active: false,
        email: 'jackson@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'John',
        active: true,
        email: 'john@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Paul',
        active: true,
        email: 'paul@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Students', null, {})
  }
}
