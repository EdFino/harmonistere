import React, { useState } from 'react';
import SubNavbarSheet from './subNavbarSheet';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import kit from '../style/kitUI.module.css';
import iconeQuestion from '../images/Icone questions.png';

const schema = yup.object().shape({
    bodyLevel: yup.string().required ("Attention : vous devez choisir un niveau pour le corps de votre personnage"),
    mindLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l'esprit de votre personnage"),
    soulLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l'âme de votre personnage"),
    martialArtsLevel: yup.string().required ("Attention : vous devez choisir un niveau pour les arts martiaux de votre personnage"),
    elementaryArtsLevel: yup.string().required ("Attention : vous devez choisir un niveau pour les arts élémentaires de votre personnage"),
    speakingLevel: yup.string().required ("Attention : vous devez choisir un niveau pour l\'éloquence de votre personnage"),
    sum: yup.number().test(
        'sum',
        'La somme des valeurs doit être inférieure ou égale à 0',
        function (value) {
        const parent = this.parent || {};
        const playerChoices = [
            parseInt(parent.bodyLevel),
            parseInt(parent.mindLevel),
            parseInt(parent.soulLevel),
            parseInt(parent.martialArtsLevel),
            parseInt(parent.elementaryArtsLevel),
            parseInt(parent.speakingLevel)
        ].reduce((acc, curr) => acc + curr, 0);
        return playerChoices <= 0;
    })
})

function ThirdCaracSheet ({formData, handleFormData, nextStep, previousStep, buttonSize}) {

    const { register, handleSubmit, watch, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

const characList= [
    {value:'0', description:'Neutre'},
    {value:'-1', description:'Malus -1'},
    {value:'1', description:'Bonus +1'},
    {value:'2', description:'Bonus critique +2'}
]

const onSubmitThree = async (data) => {
    handleFormData(data);
    nextStep();
}

console.log ('quel est le problème ?', errors)

    return (
        <div id='thirdChapter' className='allChapters'>
            <form id='thirdChapterForm' className='chapterForm' onSubmit={handleSubmit(onSubmitThree)}>
                <div id='inne'>
                    <select id="bodyLevel" name="bodyLevel" className={kit.inputSelectHarmonistere} {...register("bodyLevel")}>
                        <option value='' disabled selected hidden>Corps</option>
                        {characList.map((element, index) => (
                        <option key={index} value={element.value} className={kit.optionHarmonistere}>{element.description}</option>
                        ))}
                    </select>
                    {errors.bodyLevel && <><span className='invalid-feedback'>{errors.bodyLevel.message}</span><br/></>}

                    <select id="mindLevel" name="mindLevel" className={kit.inputSelectHarmonistere} {...register("mindLevel")}>
                    <option value='' disabled selected hidden>Esprit</option>
                        {characList.map((element, index) => (
                            <option key={index} value={element.value} className={kit.optionHarmonistere}>{element.description}</option>
                        ))}
                    </select>
                    {errors.mindLevel && <><span className='invalid-feedback'>{errors.mindLevel.message}</span><br/></>}

                    <select id="soulLevel" name="soulLevel" className={kit.inputSelectHarmonistere} {...register("soulLevel")}>
                    <option value='' disabled selected hidden>Âme</option>
                        {characList.map((element, index) => (
                            <option key={index} value={element.value} className={kit.optionHarmonistere}>{element.description}</option>
                        ))}
                    </select>
                    {errors.soulLevel && <><span className='invalid-feedback'>{errors.soulLevel.message}</span><br/></>}

                </div>

                <div id='acquis'>
                    <select id="martialArtsLevel" name="martialArtsLevel" className={kit.inputSelectHarmonistere} {...register("martialArtsLevel")}>
                    <option value='' disabled selected hidden>Arts martiaux</option>
                        {characList.map((element, index) => (
                        <option key={index} value={element.value} className={kit.optionHarmonistere}>{element.description}</option>
                        ))}
                    </select>
                    {errors.martialArtsLevel && <><span className='invalid-feedback'>{errors.martialArtsLevel.message}</span><br/></>}

                    <select id="elementaryArtsLevel" name="elementaryArtsLevel" className={kit.inputSelectHarmonistere} {...register("elementaryArtsLevel")}>
                        <option value='' disabled selected hidden>Arts élémentaires</option>
                        {characList.map((element, index) => (
                            <option key={index} value={element.value} className={kit.optionHarmonistere}>{element.description}</option>
                        ))}
                    </select>
                    {errors.elementaryArtsLevel && <><span className='invalid-feedback'>{errors.elementaryArtsLevel.message}</span><br/></>}

                    <select id="speakingLevel" name="speakingLevel" className={kit.inputSelectHarmonistere} {...register("speakingLevel")}>
                        <option value='' disabled selected hidden>Art oratoire</option>
                        {characList.map((element, index) => (
                        <option key={index} value={element.value} className={kit.optionHarmonistere}>{element.description}</option>
                        ))}
                    </select>
                    {errors.speakingLevel && <><span className='invalid-feedback'>{errors.speakingLevel.message}</span><br/></>}
                </div>
                <div>
                    {errors.sum && <span className='invalid-feedback'>{errors.sum.message}</span>}
                </div>
                <div className="bottomFormButtons">
                    <span className='previousButton' onClick={() => previousStep()}>Retour</span>
                    <button type='submit' className={kit.buttonHarmonistere} style={{padding: `1em ${buttonSize}`}}>Étape suivante</button>
                </div>

            </form>


        </div>
    );
}

export default ThirdCaracSheet;