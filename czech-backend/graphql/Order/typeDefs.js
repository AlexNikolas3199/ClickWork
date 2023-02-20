const { default: gql } = require('graphql-tag')

const Order = gql`
  type Order {
    id: String!
    visible: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    address: String!
    startTime: DateTime!
    endTime: DateTime
    vacation: Vacation
    vacationId: String
    user: User!
    userId: String!
    categoryName: String!
    status: OrderStatus!
    duration: Int!
  }

  type Query {
    findUniqueOrder(where: OrderWhereUniqueInput!): Order
    findFirstOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByInput!]
      cursor: OrderWhereUniqueInput
      distinct: OrderScalarFieldEnum
      skip: Int
      take: Int
    ): Order
    findManyOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByInput!]
      cursor: OrderWhereUniqueInput
      distinct: OrderScalarFieldEnum
      skip: Int
      take: Int
    ): [Order!]
    findManyOrderCount(
      where: OrderWhereInput
      orderBy: [OrderOrderByInput!]
      cursor: OrderWhereUniqueInput
      distinct: OrderScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByInput!]
      cursor: OrderWhereUniqueInput
      distinct: OrderScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateOrder
  }
  type Mutation {
    createOneOrder(data: OrderCreateInput!): Order!
    updateOneOrder(
      where: OrderWhereUniqueInput!
      data: OrderUpdateInput!
    ): Order!
    deleteOneOrder(where: OrderWhereUniqueInput!): Order
    upsertOneOrder(
      where: OrderWhereUniqueInput!
      create: OrderCreateInput!
      update: OrderUpdateInput!
    ): Order
    deleteManyOrder(where: OrderWhereInput): BatchPayload
    updateManyOrder(
      where: OrderWhereInput
      data: OrderUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Order,
}
