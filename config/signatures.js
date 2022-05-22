/**
 * @desc Signature configs for different types of signatures and their expiration times
 */
const signaturesConfig = {
  generic: {
    id: 'GENERIC',
    expiration: {
      time: 5,
      unit: 'd'
    }
  },
  email_verification: {
    id: 'EV',
    expiration: {
      time: 1,
      unit: 'd'
    }
  }
}

export default signaturesConfig
