const jwt = require('jsonwebtoken')
const {PrismaSelect} = require('@paljs/plugins')

const User = {
  Query: {
    findUniqueUser: (_parent, args, {prisma}) => {
      return prisma.user.findUnique(args)
    },
    findFirstUser: (_parent, args, {prisma}) => {
      return prisma.user.findFirst(args)
    },
    findManyUser: (_parent, args, {prisma}, info) => {
      return prisma.user.findMany(args)
    },
    findManyUserCount: (_parent, args, {prisma}) => {
      return prisma.user.count(args)
    },
    aggregateUser: (_parent, args, {prisma}) => {
      return prisma.user.aggregate(args)
    },
    me: async (_parent, args, {checkToken, prisma}) => {
      const {id} = await checkToken()
      args.where = {
        id
      }
      return prisma.user.findUnique(args)
    }
  },
  Mutation: {
    sign: async (_parent, {data}, {prisma, firebase}) => {
      const {uid, picture, name} = await firebase.auth().verifyIdToken(data.token).catch(e => {
        console.log(e)
      })
      const User = await prisma.user.findUnique({where: {forignKey: uid}})
      if (User) {
        const token = await jwt.sign(
          {id: User.id},
          process.env[`${User.role.toUpperCase()}_TOKEN`]
        )
        return {
          token,
          user: User
        }
      }
      const nameSplit = name ? name.split(' ') : ['', ''];
      const dataNewUser = {
        forignKey: uid,
        image: picture ? picture : undefined,
        name: nameSplit[0],
        surname: nameSplit[1]
      }
      const newUser = await prisma.user.create({data: dataNewUser})
      const token = await jwt.sign(
        {id: newUser.id},
        process.env[`${newUser.role.toUpperCase()}_TOKEN`]
      )
      return {
        token,
        user: newUser
      }
    },
    signUpEmail: async (_parent, {data}, {prisma, firebase}) => {
      const {uid: forignKey} = await firebase.auth().verifyIdToken(data.token)
      data = {
        ...data,
        forignKey
      }
      delete data.token
      const user = await prisma.user.create({data})
      let token = await jwt.sign(
        {id: user.id},
        process.env[`${user.role.toUpperCase()}_TOKEN`]
      )
      return {
        token,
        user
      }
    },
    createOneUser: (_parent, args, {prisma}) => {
      return prisma.user.create(args)
    },
    updateOneUser: (_parent, args, {prisma}) => {
      return prisma.user.update(args)
    },
    deleteOneUser: async (_parent, args, {prisma}) => {
      return prisma.user.delete(args)
    },
    upsertOneUser: async (_parent, args, {prisma}) => {
      return prisma.user.upsert(args)
    },
    deleteManyUser: async (_parent, args, {prisma}) => {
      return prisma.user.deleteMany(args)
    },
    updateManyUser: (_parent, args, {prisma}) => {
      return prisma.user.updateMany(args)
    },
  },
}

module.exports = {
  User,
}
