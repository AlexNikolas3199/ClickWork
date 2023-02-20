import { gql } from '@apollo/client'

export const UPDATE_ONE_USER = gql`
    mutation($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
        updateOneUser(where: $where, data: $data) {
            name
            surname
            id
            image
            email
            phone
            address
            vacation {
                name
                category {
                    name
                }
            }
            image
        }
    }
`
export const SIGN_UP_EMAIL = gql`
    mutation($data: SignUpEmailInput!) {
        signUpEmail(data: $data) {
            token
        }
    }
`
export const SIGN = gql`
    mutation($data: SignInput!) {
        sign(data: $data) {
            token
            user {
                name
                surname
                id
                phone
                email
                vacation {
                    category {
                        name
                    }
                }
            }
        }
    }
`
