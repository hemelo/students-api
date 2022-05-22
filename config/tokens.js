/**
 * @desc JWT Token and Refresh token expiration config
 */
const tokensConfig = {
  refresh: {
    expiration: {
      time: 5,
      unit: 'd'
    }
  },
  access: {
    expiration: {
      time: 1,
      unit: 'd'
    }
  }
}

export default tokensConfig
