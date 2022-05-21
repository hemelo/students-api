'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Enrollments', 'student_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Student', key: 'id' }
    })

    await queryInterface.addColumn('Enrollments', 'class_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'Class', key: 'id' }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Enrollments', 'student_id')
    await queryInterface.removeColumn('Enrollments', 'class_id')
  }
}
