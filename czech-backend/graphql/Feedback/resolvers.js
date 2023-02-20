const Feedback = {
  Query: {
    findUniqueFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.findUnique(args)
    },
    findFirstFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.findFirst(args)
    },
    findManyFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.findMany(args)
    },
    findManyFeedbackCount: (_parent, args, { prisma }) => {
      return prisma.feedback.count(args)
    },
    aggregateFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.aggregate(args)
    },
  },
  Mutation: {
    createOneFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.create(args)
    },
    updateOneFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.update(args)
    },
    deleteOneFeedback: async (_parent, args, { prisma }) => {
      return prisma.feedback.delete(args)
    },
    upsertOneFeedback: async (_parent, args, { prisma }) => {
      return prisma.feedback.upsert(args)
    },
    deleteManyFeedback: async (_parent, args, { prisma }) => {
      return prisma.feedback.deleteMany(args)
    },
    updateManyFeedback: (_parent, args, { prisma }) => {
      return prisma.feedback.updateMany(args)
    },
  },
}

module.exports = {
  Feedback,
}
