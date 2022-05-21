'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Classes', 'instructor_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'User', key: 'id' }
    })

    await queryInterface.addColumn('Classes', 'classType_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'ClassType', key: 'id' }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Classes', 'instructor_id')
    await queryInterface.removeColumn('Classes', 'classType_id')
  }
}
