import React from 'react';
import './CharacterList.css';
import useCharacter from '../hooks/useCharacter'



function CharactersLists() {
  const {loading, data} =  useCharacter()

  if (loading) return <div> Spinner..</div>

  return (
    <div className='CharacterList'>
      {data.characters.results.map(character => {
        return <div key={character.id}>
          <img src={character.image} alt="Oops"/>
          <h2>{character.name}</h2>
        </div>
      })}

    </div>
  )
}

export default CharactersLists