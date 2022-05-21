'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import databaseConfig from '../config/database.js'

const env = process.env.NODE_ENV || 'development'
const config = databaseConfig[env]
const basename = path.basename(__filename)
const database = {}

const sequelize = new Sequelize(process.env[config.use_env_variable], config)

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(async file => {
    const model = (await import(path.join(__dirname, file))).default(m => m(sequelize, Sequelize.DataTypes))
    database[model.name] = model
  })

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database)
  }
})

database.sequelize = sequelize
database.Sequelize = Sequelize

export default database
