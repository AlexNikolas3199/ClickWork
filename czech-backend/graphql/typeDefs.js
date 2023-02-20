const {Order} = require('./Order/typeDefs')
const {Feedback} = require('./Feedback/typeDefs')
const {User} = require('./User/typeDefs')
const {Vacation} = require('./Vacation/typeDefs')
const {Price} = require('./Price/typeDefs')
const {Category} = require('./Category/typeDefs')
const {mergeTypeDefs} = require('@graphql-tools/merge')
const {sdlInputs} = require('@paljs/plugins')

const {Upload} = require('./Upload/typeDefs')
const {default: gql} = require('graphql-tag')

const Initial = gql`
    scalar Json
`

const typeDefs = mergeTypeDefs([
  Initial,
  Upload,
  sdlInputs(),
  Category,
  Vacation,
  User,
  Feedback,
  Order,
  Price
])

module.exports = {typeDefs}
