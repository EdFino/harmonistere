import React from 'react'
import { useCharacterContext } from '../hooks/CharacterContext';

function ComposantTestTwo () {

        const { characterData } = useCharacterContext();
    

  return (
    <div>ComposantTest Age : {characterData.age}</div>
  )
}

export default ComposantTestTwo;