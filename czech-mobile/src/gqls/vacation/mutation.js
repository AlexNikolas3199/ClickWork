import {gql} from '@apollo/client'

export const CREATE_VACATION = gql`
mutation($data:VacationCreateInput!){
  createOneVacation(data:$data){
    id
  }
}
`

export const UPDATE_ONE_VACATION = gql`
  mutation($data:VacationUpdateInput!, $where:VacationWhereUniqueInput!){
  updateOneVacation(data:$data, where:$where ){
    id
  }
}
`