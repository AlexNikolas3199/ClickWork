const { default: gql } = require('graphql-tag')

const Feedback = gql`
  type Feedback {
    id: String!
    visible: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    value: Float!
    comment: String!
    user: User!
    userId: String!
    userNanimatelName: String
    userNanimatelImage: String
  }

  type Query {
    findUniqueFeedback(where: FeedbackWhereUniqueInput!): Feedback
    findFirstFeedback(
      where: FeedbackWhereInput
      orderBy: [FeedbackOrderByInput!]
      cursor: FeedbackWhereUniqueInput
      distinct: FeedbackScalarFieldEnum
      skip: Int
      take: Int
    ): Feedback
    findManyFeedback(
      where: FeedbackWhereInput
      orderBy: [FeedbackOrderByInput!]
      cursor: FeedbackWhereUniqueInput
      distinct: FeedbackScalarFieldEnum
      skip: Int
      take: Int
    ): [Feedback!]
    findManyFeedbackCount(
      where: FeedbackWhereInput
      orderBy: [FeedbackOrderByInput!]
      cursor: FeedbackWhereUniqueInput
      distinct: FeedbackScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateFeedback(
      where: FeedbackWhereInput
      orderBy: [FeedbackOrderByInput!]
      cursor: FeedbackWhereUniqueInput
      distinct: FeedbackScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateFeedback
  }
  type Mutation {
    createOneFeedback(data: FeedbackCreateInput!): Feedback!
    updateOneFeedback(
      where: FeedbackWhereUniqueInput!
      data: FeedbackUpdateInput!
    ): Feedback!
    deleteOneFeedback(where: FeedbackWhereUniqueInput!): Feedback
    upsertOneFeedback(
      where: FeedbackWhereUniqueInput!
      create: FeedbackCreateInput!
      update: FeedbackUpdateInput!
    ): Feedback
    deleteManyFeedback(where: FeedbackWhereInput): BatchPayload
    updateManyFeedback(
      where: FeedbackWhereInput
      data: FeedbackUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Feedback,
}
