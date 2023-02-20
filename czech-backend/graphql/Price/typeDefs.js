const { default: gql } = require('graphql-tag')

const Price = gql`
  type Price {
    id: String!
    category: Category!
    categoryId: String!
    type: PriceLeague!
    price: Int!
  }

  type Query {
    findUniquePrice(where: PriceWhereUniqueInput!): Price
    findFirstPrice(
      where: PriceWhereInput
      orderBy: [PriceOrderByInput!]
      cursor: PriceWhereUniqueInput
      distinct: PriceScalarFieldEnum
      skip: Int
      take: Int
    ): Price
    findManyPrice(
      where: PriceWhereInput
      orderBy: [PriceOrderByInput!]
      cursor: PriceWhereUniqueInput
      distinct: PriceScalarFieldEnum
      skip: Int
      take: Int
    ): [Price!]
    findManyPriceCount(
      where: PriceWhereInput
      orderBy: [PriceOrderByInput!]
      cursor: PriceWhereUniqueInput
      distinct: PriceScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregatePrice(
      where: PriceWhereInput
      orderBy: [PriceOrderByInput!]
      cursor: PriceWhereUniqueInput
      distinct: PriceScalarFieldEnum
      skip: Int
      take: Int
    ): AggregatePrice
  }
  type Mutation {
    createOnePrice(data: PriceCreateInput!): Price!
    updateOnePrice(
      where: PriceWhereUniqueInput!
      data: PriceUpdateInput!
    ): Price!
    deleteOnePrice(where: PriceWhereUniqueInput!): Price
    upsertOnePrice(
      where: PriceWhereUniqueInput!
      create: PriceCreateInput!
      update: PriceUpdateInput!
    ): Price
    deleteManyPrice(where: PriceWhereInput): BatchPayload
    updateManyPrice(
      where: PriceWhereInput
      data: PriceUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Price,
}
