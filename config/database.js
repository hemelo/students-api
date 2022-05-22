/**
 * @desc Database config used to initialize application models
 */
const databaseConfig = {
  development: {
    use_env_variable: 'TEST_DATABASE',
    dialect: process.env.DB_DIALECT
  },
  test: {
    use_env_variable: 'DEVELOPMENT_DATABASE',
    dialect: process.env.DB_DIALECT
  },
  production: {
    use_env_variable: 'PRODUCTION_DATABASE',
    dialect: process.env.DB_DIALECT
  }
}

export default databaseConfig
