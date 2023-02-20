const { Feedback } = require('./Feedback/resolvers')
const { User } = require('./User/resolvers')
const { Vacation } = require('./Vacation/resolvers')
const { Category } = require('./Category/resolvers')
const { Upload } = require('./Upload/resolvers')
const { Price } = require('./Price/resolvers')
const { Order } = require('./Order/resolvers')

const resolvers = [
    Upload,
    Price,
    Category,
    Vacation,
    User,
    Feedback,
    Order
]

module.exports = { resolvers }
