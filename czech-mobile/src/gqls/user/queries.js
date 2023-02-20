import { gql } from '@apollo/client'

export const ME = gql`
    query {
        me {
            name
            surname
            address
            createdAt
            id
            phone
            email
            vacation {
                description
                id
                createdAt
                league
                OMR
                category {
                    name
                    pricing{
                        id
                        type
                        price
    }
                }
                user {
                    id
                    image
                    name
                    surname
                    feedbacks {
                        value
                    }
                }
                order {
                    id
                }
            }
            feedbacks {
                id
                value
            }
            image
        }
    }
`
