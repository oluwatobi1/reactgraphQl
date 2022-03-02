import React from 'react'
import { useParams } from 'react-router';
import { useGetAllCharactersById } from '../hooks/useGetCharacterById';
import "./CharacterDetails.css"

export default function CharacterDetails() {
  const { id } = useParams()
  const { loading, data } = useGetAllCharactersById(id)
  console.log(loading, data);

  if (loading) return <div>Second spinner</div>
  return (
    <div>
      <img src={data.character.image} alt="opps"/>
      <div className='Character-content'>
        <h2>{data.character.name}</h2>
        <p>{data.character.species}</p>
        <div  className='Character-episode'>
          {data.character.episode.map(episode =>{
            return <div key={episode.id}>{episode.name}- <b>{episode.episode}</b></div>
          })}
        </div>
        </div>      
    </div>
  )
}
