import { gql } from '@apollo/client'

export const FIND_MANY_ORDER = gql`
    query ($where:OrderWhereInput){
        findManyOrder(where:$where){
            id
            createdAt
            user{
                id
                name
                surname
            }
            vacation {
                id
                league
                OMR
                location
                order{
                    id
                }
                category {
                    color
                    name
                    pricing {
                        type
                        price
                    }
                }
                user{
                    id
                    name
                    surname
                    image
                    phone
                }
            }
            address
            startTime
            endTime
            status
            duration
            categoryName
        }
    }
`

export const INCOMING_ORDERS = gql`
    query IncomingOrders($id: String) {
        findManyOrder(
            where: {
                vacation: { userId: { equals: $id } }
                OR: [{ status: { equals: AWAITING } }, { status: { equals: IN_PROGRESS } }]
            }
            orderBy: { createdAt: desc }
        ) {
            id
            createdAt
            status
            user {
                id
                name
                surname
                phone
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
            endTime
            duration
            address
        }
    }
`
