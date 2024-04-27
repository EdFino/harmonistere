import React, { useState } from 'react';
import SubNavbarSheet from './subNavbarSheet';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;

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

function ThirdCaracSheet ({formData, handleFormData, nextStep, previousStep}) {

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
        <div id='thirdChapter'>
            <form id='thirdChapterForm' onSubmit={handleSubmit(onSubmitThree)}>
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
                <button type='button' onClick={() => previousStep()}>Retour</button>
                <button type='submit'>Suivant</button>
            </form>

            {errors.sum && <span className='invalid-feedback'>{errors.sum.message}</span>}

            <div className="sideTextForm">
                <p>
                    Vous pouvez maintenant déterminer les qualités et défauts de votre personnage à travers ces six caractéristiques.
                    Vous commencez par défaut en neutre partout, et si vous cherchez à poser un bonus quelque part, il faudra contrebalancer par un défaut.
                    Quant à un bonus critique, il faudra deux défauts pour se le procurer.
                </p>
            </div>

            <Popup trigger=
            {
            <div id='thirdHelp' className='helpPopup'>
                ?
            </div>}

            position="left center">

            <p>
                Les caractéristiques sont exprès décrites vagues. Vous pouvez ainsi vous les approprier et décider comment interpréter un bonus ou un malus à votre personnage.<br/>
                Corps : A rapport à vos capacités physiques : votre force brute, votre endurance, votre agilité, voire même une haute taille ou un beau visage, sont comptés dedans.<br/>
                Esprit : Vous pouvez compter dans esprit tout ce qui touche de près ou de loin à l'intellect : les capacités de déduction et de raisonnement, la mémoire, l'intelligence vive, la ruse ou les connaissances.<br/>
                Âme : L'âme comporte des qualités qu'on lie à la volonté, le sang-froid ou l'aura que dégage votre personnage.<br/>
                Arts martiaux : Cette caractéristique fait évidemment référence à votre qualité au corps-à-corps ; à vous de décider ensuite ce qui fait de votre personnage un guerrier redoutable.<br/>
                Arts élémentaires : Un harmonistère digne de ce nom investira soigneusement dans cette caractéristique qui détermine son aptitude à maîtriser son élément.<br/>
                Arts oratoires : Concerne l'éloquence de votre personnage, sa capacité à parler, être écouté, et cru.

            </p>
            </Popup>
        </div>
    );
}

export default ThirdCaracSheet;