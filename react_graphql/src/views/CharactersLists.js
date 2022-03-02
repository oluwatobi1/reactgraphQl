import React from 'react';
import './CharacterList.css';
import useGetAllCharacter from '../hooks/useGetAllCharacter'
import { Link } from 'react-router-dom';



function CharactersLists() {
  const {loading, data} =  useGetAllCharacter()

  if (loading) return <div> Spinner..</div>

  return (
    <div className='CharacterList'>
      {data.characters.results.map(character => {
        return <Link to={character.id} key={character.id}>
          <img src={character.image} alt="Oops"/>
          <h2>{character.name}</h2>
        </Link>
      })}

    </div>
  )
}

export default CharactersLists