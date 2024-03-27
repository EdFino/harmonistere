import React, { useState } from 'react';

function SelectCharacteristic ({onCharacteristicSelect}) {

    const [bodyValue, setBodyValue] = useState('0');
    const [mindValue, setMindValue] = useState('0');
    const [soulValue, setSoulValue] = useState('0');
    const [martialValue, setMartialValue] = useState('0');
    const [elementaryValue, setElementaryValue] = useState('0');
    const [speakingValue, setSpeakingValue] = useState('0');


        const bodySelectChange = (e) => {
        const bodyValue = e.target.value;
        setBodyValue(bodyValue);
        };

        const mindSelectChange = (e) => {
        const mindValue = e.target.value;
        setMindValue(mindValue);
        };

        const soulSelectChange = (e) => {
        const soulValue = e.target.value;
        setSoulValue(soulValue);
        };

        const martialSelectChange = (e) => {
        const martialValue = e.target.value;
        setMartialValue(martialValue);
        };

    
        const elementarySelectChange = (e) => {
        const elementaryValue = e.target.value;
        setElementaryValue(elementaryValue);
        };

        const speakingSelectChange = (e) => {
        const speakingValue = e.target.value;
        setSpeakingValue(speakingValue);
        };


const characList= [
    {value:'0', description:'Neutre'},
    {value:'-1', description:'Malus -1'},
    {value:'1', description:'Bonus +1'},
    {value:'2', description:'Bonus critique +2'}
]

  const handlecontrolLevel = () => {
    const limitLevel = 0;
    const playerChoices = parseInt(bodyValue, 10) + parseInt(mindValue, 10) + parseInt(soulValue, 10) + parseInt(martialValue, 10) + parseInt(elementaryValue, 10) + parseInt(speakingValue, 10)
    console.log (bodyValue, mindValue, soulValue, martialValue, elementaryValue, speakingValue, playerChoices);
    if (playerChoices > limitLevel) {
        return console.log ('Vous avez été trop généreux avec vous-même, arrêtez ça...')
    } else {onCharacteristicSelect(bodyValue, mindValue, soulValue, martialValue, elementaryValue, speakingValue)}
  }

  return (
    <div id='characForm'>
        <div id='inne'>
            <label htmlFor='body'>Corps</label>
            <select id="body" name="body" value={bodyValue} onChange={bodySelectChange}>
                {characList.map((element, index) => (
                <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            <label htmlFor='spirit'>Mental</label>
            <select id="spirit" name="spirit" value={mindValue} onChange={mindSelectChange}>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            <label htmlFor='soul'>Âme</label>
            <select id="soul" name="soul" value={soulValue} onChange={soulSelectChange}>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
        </div>
        <div id='acquis'>
            <label htmlFor='martialArts'>Arts martiaux</label>
                <select id="martialArts" name="martialArts" value={martialValue} onChange={martialSelectChange}>
                    {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                <label htmlFor='elementaryArts'>Arts élémentaires</label>
                <select id="elementaryArts" name="elementaryArts" value={elementaryValue} onChange={elementarySelectChange}>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                <label htmlFor='publicSpeaking'>Arts oratoires</label>
                <select id="publicSpeaking" name="publicSpeaking" value={speakingValue} onChange={speakingSelectChange}>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
        </div>
        <button type='button' onClick={handlecontrolLevel}>Clique</button>
    </div>
    );
}

export default SelectCharacteristic;