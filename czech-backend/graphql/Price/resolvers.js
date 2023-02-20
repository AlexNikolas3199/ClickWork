const Price = {
  Query: {
    findUniquePrice: (_parent, args, { prisma }) => {
      return prisma.price.findUnique(args)
    },
    findFirstPrice: (_parent, args, { prisma }) => {
      return prisma.price.findFirst(args)
    },
    findManyPrice: (_parent, args, { prisma }) => {
      return prisma.price.findMany(args)
    },
    findManyPriceCount: (_parent, args, { prisma }) => {
      return prisma.price.count(args)
    },
    aggregatePrice: (_parent, args, { prisma }) => {
      return prisma.price.aggregate(args)
    },
  },
  Mutation: {
    createOnePrice: (_parent, args, { prisma }) => {
      return prisma.price.create(args)
    },
    updateOnePrice: (_parent, args, { prisma }) => {
      return prisma.price.update(args)
    },
    deleteOnePrice: async (_parent, args, { prisma }) => {
      return prisma.price.delete(args)
    },
    upsertOnePrice: async (_parent, args, { prisma }) => {
      return prisma.price.upsert(args)
    },
    deleteManyPrice: async (_parent, args, { prisma }) => {
      return prisma.price.deleteMany(args)
    },
    updateManyPrice: (_parent, args, { prisma }) => {
      return prisma.price.updateMany(args)
    },
  },
}

module.exports = {
  Price,
}
