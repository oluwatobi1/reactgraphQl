import { gql, useQuery } from '@apollo/client'


const GET_CHARACTERS = gql `
query {
  characters{
    results{
      id
      name
      status
      image
    }
  }
}
`

const useGetAllCharacters = () => {
    const { error, loading, data } = useQuery(GET_CHARACTERS)
    return {
        error,
        loading,
        data
    }

};
export default useGetAllCharacters;