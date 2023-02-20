const { default: gql } = require('graphql-tag')

const Vacation = gql`
  type Vacation {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    visible: Boolean!
    name: String!
    user: User!
    userId: String!
    category: Category!
    categoryId: String!
    order(
      where: OrderWhereInput
      orderBy: OrderOrderByInput
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: OrderScalarFieldEnum
    ): [Order!]!
    league: PriceLeague!
    OMR: Int
    description: String
    location: Json!
  }

  type Query {
    findUniqueVacation(where: VacationWhereUniqueInput!): Vacation
    findFirstVacation(
      where: VacationWhereInput
      orderBy: [VacationOrderByInput!]
      cursor: VacationWhereUniqueInput
      distinct: VacationScalarFieldEnum
      skip: Int
      take: Int
    ): Vacation
    findManyVacation(
      where: VacationWhereInput
      orderBy: [VacationOrderByInput!]
      cursor: VacationWhereUniqueInput
      distinct: VacationScalarFieldEnum
      skip: Int
      take: Int
    ): [Vacation!]
    findManyVacationCount(
      where: VacationWhereInput
      orderBy: [VacationOrderByInput!]
      cursor: VacationWhereUniqueInput
      distinct: VacationScalarFieldEnum
      skip: Int
      take: Int
    ): Int!
    aggregateVacation(
      where: VacationWhereInput
      orderBy: [VacationOrderByInput!]
      cursor: VacationWhereUniqueInput
      distinct: VacationScalarFieldEnum
      skip: Int
      take: Int
    ): AggregateVacation
  }
  type Mutation {
    createOneVacation(data: VacationCreateInput!): Vacation!
    updateOneVacation(
      where: VacationWhereUniqueInput!
      data: VacationUpdateInput!
    ): Vacation!
    deleteOneVacation(where: VacationWhereUniqueInput!): Vacation
    upsertOneVacation(
      where: VacationWhereUniqueInput!
      create: VacationCreateInput!
      update: VacationUpdateInput!
    ): Vacation
    deleteManyVacation(where: VacationWhereInput): BatchPayload
    updateManyVacation(
      where: VacationWhereInput
      data: VacationUpdateManyMutationInput
    ): BatchPayload
  }
`

module.exports = {
  Vacation,
}
