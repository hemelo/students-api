'use strict'

import module from 'module'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Enrollments', [
      {
        status: true,
        student_id: 1,
        class_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: true,
        student_id: 2,
        class_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: true,
        student_id: 3,
        class_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: true,
        student_id: 4,
        class_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: false,
        student_id: 1,
        class_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: false,
        student_id: 2,
        class_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Enrollments', null, {})
  }
}
