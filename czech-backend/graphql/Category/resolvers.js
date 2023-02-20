const Category = {
  Query: {
    findUniqueCategory: (_parent, args, { prisma }) => {
      return prisma.category.findUnique(args)
    },
    findFirstCategory: (_parent, args, { prisma }) => {
      return prisma.category.findFirst(args)
    },
    findManyCategory: (_parent, args, { prisma }) => {
      return prisma.category.findMany(args)
    },
    findManyCategoryCount: (_parent, args, { prisma }) => {
      return prisma.category.count(args)
    },
    aggregateCategory: (_parent, args, { prisma }) => {
      return prisma.category.aggregate(args)
    },
  },
  Mutation: {
    createOneCategory: (_parent, args, { prisma }) => {
      return prisma.category.create(args)
    },
    updateOneCategory: (_parent, args, { prisma }) => {
      return prisma.category.update(args)
    },
    deleteOneCategory: async (_parent, args, { prisma }) => {
      return prisma.category.delete(args)
    },
    upsertOneCategory: async (_parent, args, { prisma }) => {
      return prisma.category.upsert(args)
    },
    deleteManyCategory: async (_parent, args, { prisma }) => {
      return prisma.category.deleteMany(args)
    },
    updateManyCategory: (_parent, args, { prisma }) => {
      return prisma.category.updateMany(args)
    },
  },
}

module.exports = {
  Category,
}
