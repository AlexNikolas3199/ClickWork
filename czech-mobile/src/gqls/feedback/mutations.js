
import {gql} from '@apollo/client'

export const CREATE_ONE_FEEDBACK = gql`
mutation ($data:FeedbackCreateInput!){
    createOneFeedback(data:$data){
        id
        visible
        createdAt
        updatedAt
        value
        comment
        user {
            id
            name
            surname
        }
        userId
        userNanimatelName
        userNanimatelImage
    }
}
`
