import React from 'react'
import { gql, useMutation } from '@apollo/client';

// This is a demo of how mutations work
// graphql endpoint
// https://graphql-compose.herokuapp.com/user
const CREATE_USER = gql`
mutation createUserMutation( $name:String!, $age:Int!){
  userCreate(record:{
    name:$name
    age: $age
  })
  {
    record{
      _id
      name
      age
    }
  }
}
`

export default function Mutations() {
  const [createUser, { loading, data }] = useMutation(CREATE_USER, {
    variables: {
      // inject params dynamically here
      name: "Oluwatobi",
      age: 23
    }
  })
  return (
    <div>Mutations Page
      <button onClick={() => createUser}> Create user</button>
    </div>
  )
}
