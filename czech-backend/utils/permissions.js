const {shield, or} = require('graphql-shield')

const rules = require('./rules')

const permissions = shield({
  Query: {
    me: rules.isAuthenticated
  },
  Mutation: {
    createOneVacation: or(rules.isMe, rules.isAdmin)
  },
}, {
  allowExternalErrors: true,
  fallbackError: 'No permission'
})

module.exports = {
  permissions
}
