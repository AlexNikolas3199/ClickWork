import { gql } from '@apollo/client'

export const FIND_MANY_CATEGORY = gql`
    query (
        $where: CategoryWhereInput
        $orderBy: [CategoryOrderByInput!]
        $take: Int
        $skip: Int
        $cursor: CategoryWhereUniqueInput
    ) {
        findManyCategory(
            where: $where
            orderBy: $orderBy
            take: $take
            skip: $skip
            cursor: $cursor
        ) {
            id
            name
            color
            icon
            iconFamily
        }
    }
`
