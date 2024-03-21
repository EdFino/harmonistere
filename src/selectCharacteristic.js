import React, { useState } from 'react';

const characList= [
    {value:'-1', description:'Malus -1'},
    {value:'0', description:'Neutre'},
    {value:'1', description:'Bonus +1'},
    {value:'2', description:'Bonus critique +2'}
]

function SelectCharacteristic() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedValue(selectedValue);
    console.log(selectedValue);
  };

  return (
    <div id='characForm'>
        <div id='inne'>
            <label htmlFor='body'>Corps</label>
            <select id="body" name="body" value={selectedValue} onChange={handleSelectChange}>
                <option value=''>Choisissez un élément dans la liste : </option>
                {characList.map((element, index) => (
                <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            <label htmlFor='spirit'>Mental</label>
            <select id="spirit" name="spirit" value={selectedValue} onChange={handleSelectChange}>
                <option value=''>Choisissez un élément dans la liste : </option>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
            <label htmlFor='soul'>Âme</label>
            <select id="soul" name="soul" value={selectedValue} onChange={handleSelectChange}>
                <option value=''>Choisissez un élément dans la liste : </option>
                {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                ))}
            </select>
        </div>
        <div id='acquis'>
            <label htmlFor='martialArts'>Arts martiaux</label>
                <select id="martialArts" name="martialArts" value={selectedValue} onChange={handleSelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {characList.map((element, index) => (
                    <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                <label htmlFor='elementaryArts'>Arts élémentaires</label>
                <select id="elementaryArts" name="elementaryArts" value={selectedValue} onChange={handleSelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
                <label htmlFor='publicSpeaking'>Arts oratoires</label>
                <select id="publicSpeaking" name="publicSpeaking" value={selectedValue} onChange={handleSelectChange}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {characList.map((element, index) => (
                        <option key={index} value={element.value}>{element.description}</option>
                    ))}
                </select>
        </div>
    </div>
    );
}

export default SelectCharacteristic;
