const {default: gql} = require('graphql-tag')

const User = gql`
    type SignOutput {
        token: String!
        user: User!
    }
    input SignInput {
        token: String!
    }
    input SignUpEmailInput {
        name: String!
        surname: String!
        token:String!
    }
    type User {
        id: String!
        visible: Boolean!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        surname: String!
        phone: String
        email: String
        forignKey: String!
        image: String
        vacation: Vacation
        feedbacks(
            where: FeedbackWhereInput
            orderBy: FeedbackOrderByInput
            cursor: FeedbackWhereUniqueInput
            take: Int
            skip: Int
            distinct: FeedbackScalarFieldEnum
        ): [Feedback!]!
        order(
            where: OrderWhereInput
            orderBy: OrderOrderByInput
            cursor: OrderWhereUniqueInput
            take: Int
            skip: Int
            distinct: OrderScalarFieldEnum
        ): [Order!]!
        address: String
        role: RoleEnum!
        passport: String
        selfie: String
    }

    type Query {
        # 
        me: User
        # 
        findUniqueUser(where: UserWhereUniqueInput!): User
        findFirstUser(
            where: UserWhereInput
            orderBy: [UserOrderByInput!]
            cursor: UserWhereUniqueInput
            distinct: UserScalarFieldEnum
            skip: Int
            take: Int
        ): User
        findManyUser(
            where: UserWhereInput
            orderBy: [UserOrderByInput!]
            cursor: UserWhereUniqueInput
            distinct: UserScalarFieldEnum
            skip: Int
            take: Int
        ): [User!]
        findManyUserCount(
            where: UserWhereInput
            orderBy: [UserOrderByInput!]
            cursor: UserWhereUniqueInput
            distinct: UserScalarFieldEnum
            skip: Int
            take: Int
        ): Int!
        aggregateUser(
            where: UserWhereInput
            orderBy: [UserOrderByInput!]
            cursor: UserWhereUniqueInput
            distinct: UserScalarFieldEnum
            skip: Int
            take: Int
        ): AggregateUser
    }
    type Mutation {
        # 
        sign(data: SignInput!): SignOutput!
        signUpEmail(data: SignUpEmailInput!): SignOutput!
        # 
        createOneUser(data: UserCreateInput!): User!
        updateOneUser(where: UserWhereUniqueInput!, data: UserUpdateInput!): User!
        deleteOneUser(where: UserWhereUniqueInput!): User
        upsertOneUser(
            where: UserWhereUniqueInput!
            create: UserCreateInput!
            update: UserUpdateInput!
        ): User
        deleteManyUser(where: UserWhereInput): BatchPayload
        updateManyUser(
            where: UserWhereInput
            data: UserUpdateManyMutationInput
        ): BatchPayload
    }
`

module.exports = {
  User,
}
