const rules = {
  class: {
    max_per_classroom: 20
  },
  roles: [
    'instructor',
    'student'
  ],
  user: {
    email_verification: {
      status: true,
      route: 'verify-email'
    },
    token_refresh: {
      route: 'token-refresh'
    }
  }
}

export default rules
