import React from 'react'
import { gql, useLazyQuery } from '@apollo/client';


const SEARCH_CHARACTER = gql`
query searchCharacter($name:String!){
  characters(filter: {name: $name}){
    results{
      id
      location{
        name
        dimension
      }      
    }
  }
}`

export default function Search() {
    const [name, setName] = React.useState('')

    const [getSearchCharacters, {loading, data, called}]= useLazyQuery(SEARCH_CHARACTER, {
        variables:{
            name
        }
    })

    console.log(loading, data, called);
  return (
    <div>
        <input value={name} onChange={(e)=>setName(e.target.value)}/>
        <button onClick={()=>getSearchCharacters()}>Search</button>
        {loading && <div>third Spinner</div>}
        {data && (
            <ul>
                {data.characters.results.map(character=>{
                    return <li key={character.id}>{character.location.name}</li>
                })}
            </ul>
        )}
    </div>
  )
};
