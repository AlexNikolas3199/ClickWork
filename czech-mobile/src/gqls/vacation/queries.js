import { gql } from '@apollo/client'

export const FIND_MANY_VACATION = gql`
    query ($where: VacationWhereInput) {
        findManyVacation(where: $where) {
            id
            name
            location
            createdAt
            league
            description
            user {
                id
                image
                name
                surname
                feedbacks {
                    id
                    value
                }
            }
            order {
                id
            }
            category {
                id
                name
                color
                pricing {
                    type
                    price
                }
            }
        }
    }
`
