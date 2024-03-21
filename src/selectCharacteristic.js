import React, { useState } from 'react';

function SelectCharacteristic () {

    const [bodyValue, setBodyValue] = useState('');
    const [mindValue, setMindValue] = useState('');
    const [soulValue, setSoulValue] = useState('');
    const [martialValue, setMartialValue] = useState('');
    const [elementaryValue, setElementaryValue] = useState('');
    const [speakingValue, setspeakingValue] = useState('');


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
    {value:'-1', description:'Malus -1'},
    {value:'0', description:'Neutre'},
    {value:'1', description:'Bonus +1'},
    {value:'2', description:'Bonus critique +2'}
]

  function controlLevels () {
 return null
  }

  return (
    <div id='characForm'>
        <div id='inne'>
            <label htmlFor='body'>Corps</label>
            <select id="body" name="body" value={bodyValue} onChange={bodySelectChange}>
                <option value=''>Choisissez un élément dans la liste : </option>
                {characList.map((element, index) => (
                <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            <label htmlFor='spirit'>Mental</label>
            <select id="spirit" name="spirit" value={mindValue} onChange={mindSelectChange}>
                <option value=''>Choisissez un élément dans la liste : </option>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            <label htmlFor='soul'>Âme</label>
            <select id="soul" name="soul" value={soulValue} onChange={soulSelectChange}>
                <option value=''>Choisissez un élément dans la liste : </option>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
        </div>
        <div id='acquis'>
            <label htmlFor='martialArts'>Arts martiaux</label>
                <select id="martialArts" name="martialArts" value={martialValue} onChange={marialSelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                <label htmlFor='elementaryArts'>Arts élémentaires</label>
                <select id="elementaryArts" name="elementaryArts" value={elementaryValue} onChange={elementarySelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                <label htmlFor='publicSpeaking'>Arts oratoires</label>
                <select id="publicSpeaking" name="publicSpeaking" value={speakingValue} onChange={speakingSelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
        </div>
        <button type='button' onClick={controlLevels}>Clique</button>
    </div>
    );
}

export default SelectCharacteristic;
