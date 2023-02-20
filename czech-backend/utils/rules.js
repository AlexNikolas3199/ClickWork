const { rule } = require('graphql-shield')

const {checkRole} = require('./auth')

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, { authorization, prisma }, info) => {
        if (authorization)
            return true
        else
            return false
    }
)

const isMe = rule({ cache: 'contextual'})(
    async (parent, args, { checkToken, prisma }, info) => {
        const { id } = await checkToken()
        return id === args.data.user.connect.id
    }
)

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return checkRole(authorization, "ADMIN", prisma, false)
})

// const isEditor = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
//     return checkRole(authorization, "EDITOR", prisma, false)
// })

module.exports = {
    isAuthenticated,
    isAdmin,
    isMe
    // isEditor
}