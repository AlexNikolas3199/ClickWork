import { gql } from '@apollo/client'

export const FIND_MANY_FEEDBACK = gql`
 query($where:FeedbackWhereInput){
  findManyFeedback(where:$where){
    id
    value
    comment
    user{
      image
      name
      surname
    }
    userId
    userNanimatelName
    userNanimatelImage
  }
}
`
