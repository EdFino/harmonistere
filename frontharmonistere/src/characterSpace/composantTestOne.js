import React from 'react'
import { useCharacterContext } from '../hooks/CharacterContext'; // adapte le chemin si besoin


function ComposantTestOne () {

    const { characterData } = useCharacterContext();

  return (
    <div>ComposantTest name : {characterData.name}</div>
  )
}

export default ComposantTestOne;