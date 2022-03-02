import { gql, useQuery } from "@apollo/client";

const GET_CHARACTERS_BY_ID = gql `
query getOneCharacter($id:ID!){
    character(id:$id){
      id
    name
    status
    species
    image
    episode{
      id
      name
      episode
    }}
  }
`

export const useGetAllCharactersById = (id) => {
    const { loading, data } = useQuery(GET_CHARACTERS_BY_ID, {
        variables: {
            id
        }
    });

    return {
        loading,
        data
    }
};