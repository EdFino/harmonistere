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
            <label htmlFor='bodyLevel'>Corps</label>
            <select id="bodyLevel" name="bodyLevel" {...register("bodyLevel")}>
                {characList.map((element, index) => (
                <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            {errors.bodyLevel && <><span className='invalid-feedback'>{errors.bodyLevel.message}</span><br/></>}

            <label htmlFor='mindLevel'>Mental</label>
            <select id="mindLevel" name="mindLevel" {...register("mindLevel")}>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            {errors.mindLevel && <><span className='invalid-feedback'>{errors.mindLevel.message}</span><br/></>}

            <label htmlFor='soulLevel'>Âme</label>
            <select id="soulLevel" name="soulLevel" {...register("soulLevel")}>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            {errors.soulLevel && <><span className='invalid-feedback'>{errors.soulLevel.message}</span><br/></>}

        </div>
        <div id='acquis'>
            <label htmlFor='martialArtsLevel'>Arts martiaux</label>
                <select id="martialArtsLevel" name="martialArtsLevel" {...register("martialArtsLevel")}>
                    {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                {errors.martialArtsLevel && <><span className='invalid-feedback'>{errors.martialArtsLevel.message}</span><br/></>}

                <label htmlFor='elementaryArtsLevel'>Arts élémentaires</label>
                <select id="elementaryArtsLevel" name="elementaryArtsLevel" {...register("elementaryArtsLevel")}>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                {errors.elementaryArtsLevel && <><span className='invalid-feedback'>{errors.elementaryArtsLevel.message}</span><br/></>}

                <label htmlFor='speakingLevel'>Arts oratoires</label>
                <select id="speakingLevel" name="speakingLevel" {...register("speakingLevel")}>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                {errors.speakingLevel && <><span className='invalid-feedback'>{errors.speakingLevel.message}</span><br/></>}
        </div>
        <button type='button' onClick={handlecontrolLevel}>Clique</button>
    </div>
    );
}

export default SelectCharacteristic;