'use strict'

import module from 'module'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Classes', [
      {
        start_date: '2020-02-01',
        classType_id: 1,
        instructor_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-02-01',
        classType_id: 2,
        instructor_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-02-01',
        classType_id: 3,
        instructor_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        start_date: '2020-07-01',
        classType_id: 3,
        instructor_id: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Classes', null, {})
  }
}
