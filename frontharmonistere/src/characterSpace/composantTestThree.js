import React from 'react'
import { useCharacterContext } from '../hooks/CharacterContext';

function ComposantTestThree () {

    const { characterData } = useCharacterContext();

  return (
    <div>ComposantTest Trait principal : {characterData.traits.principal.name}</div>
  )
}

export default ComposantTestThree;