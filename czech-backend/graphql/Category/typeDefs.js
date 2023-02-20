const { default: gql } = require('graphql-tag')

const Category = gql`
  type Category {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String!
    iconFamily: String
    icon: String
    color: String
    pricing(
      where: PriceWhereInput
      orderBy: PriceOrderByInput
      cursor: PriceWhereUniqueInput
      take: Int
      skip: Int
      distinct: PriceScalarFieldEnum
    ): [Price!]!
    vacations(
      where: VacationWhereInput
      orderBy: VacationOrderByInput
      cursor: VacationWhereUniqueInput
      take: Int
      skip: Int
      distinct: VacationScalarFieldEnum
    ): [Vacation!]!
  }

  type Query {
    findUniqueCategory(where: CategoryWhereUniqueInput!): Category
    findFirstCategory(
      where: CategoryWhereInput
      orderBy: [CategoryOrderByInput!]
      cursor: CategoryWhereUniqueInput
      distinct: CategoryScalarFieldEnum
      skip: Int
      take: Int
    ): Category
    findManyCategory(
      where: CategoryWhereInput
      orderBy: [CategoryOrderByInput!]
      cursor: CategoryWhereUniqueInput
      distinct: CategoryScalarFieldEnum
      skip: Int
      take: Int
    ): [Category!]
    findManyCategoryCount(
      where: CategoryWhereInput
      orderBy: [CategoryOrderByInput!]
      cursor: CategoryWhereUniqueInput
      distinct: CategoryScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateCategory(
      where: CategoryWhereInput
      orderBy: [CategoryOrderByInput!]
      cursor: CategoryWhereUniqueInput
      distinct: CategoryScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateCategory
  }
  type Mutation {
    createOneCategory(data: CategoryCreateInput!): Category!
    updateOneCategory(
      where: CategoryWhereUniqueInput!
      data: CategoryUpdateInput!
    ): Category!
    deleteOneCategory(where: CategoryWhereUniqueInput!): Category
    upsertOneCategory(
      where: CategoryWhereUniqueInput!
      create: CategoryCreateInput!
      update: CategoryUpdateInput!
    ): Category
    deleteManyCategory(where: CategoryWhereInput): BatchPayload
    updateManyCategory(
      where: CategoryWhereInput
      data: CategoryUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Category,
}
