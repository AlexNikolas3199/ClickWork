import { gql } from '@apollo/client'

export const CREATE_ONE_ORDER = gql`
    mutation ($data: OrderCreateInput!) {
        createOneOrder(data: $data) {
            id
            startTime
            address
            duration
            createdAt
            userId
            vacation {
                name
                userId
                user {
                    name
                    surname
                }
            }
        }
    }
`

export const UPDATE_ONE_ORDER = gql`
    mutation ($data: OrderUpdateInput!, $where: OrderWhereUniqueInput!) {
        updateOneOrder(data: $data, where: $where) {
            id
            createdAt
            status
            user {
                id
                name
                surname
            }
            vacation {
                category {
                    pricing {
                        type
                        price
                    }
                }
            }
            startTime
            duration
            address
        }
    }
`
