const Vacation = {
  Query: {
    findUniqueVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.findUnique(args)
    },
    findFirstVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.findFirst(args)
    },
    findManyVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.findMany(args)
    },
    findManyVacationCount: (_parent, args, { prisma }) => {
      return prisma.vacation.count(args)
    },
    aggregateVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.aggregate(args)
    },
  },
  Mutation: {
    createOneVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.create(args)
    },
    updateOneVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.update(args)
    },
    deleteOneVacation: async (_parent, args, { prisma }) => {
      return prisma.vacation.delete(args)
    },
    upsertOneVacation: async (_parent, args, { prisma }) => {
      return prisma.vacation.upsert(args)
    },
    deleteManyVacation: async (_parent, args, { prisma }) => {
      return prisma.vacation.deleteMany(args)
    },
    updateManyVacation: (_parent, args, { prisma }) => {
      return prisma.vacation.updateMany(args)
    },
  },
}

module.exports = {
  Vacation,
}
