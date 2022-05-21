const rules = {
  class: {
    max_per_classroom: 20
  },
  user: {
    email_verification: {
      status: true,
      route: 'verify-email'
    },
    token_refresh: {
      route: 'token-refresh'
    },
    refresh_email_link: {
      route: 'email-link-refresh'
    }
  }
}

export default rules
