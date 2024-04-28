import React from 'react';
import SubNavbarSheet from './subNavbarSheet';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import iconeQuestion from '../images/Icone questions.png';
import kit from '../style/kitUI.module.css';
import './firstIdentitySheet.css';

const schema = yup.object().shape({
    /* characterAvatar: yup
        .mixed()
        .test('fileType', 'Le fichier doit être une image', (value) => {
            if (!value) return true; // Laisser passer s'il n'y a pas de fichier
            return value && value[0].type.startsWith('image/');
    }), */
    characterName: yup
        .string()
        .required('Attention : vous personnage doit avoir un nom !')
        .max(30, 'Attention : le prénom ne doit pas comporter plus de 30 caractères'),

    characterAge: yup.number('Attention, veuillez ne mettre que des chiffres')
    .positive('Attention : L\'âge doit être positif, bien évidemment...')
    .integer('Attention, veuillez ne pas mettre de virgule')
    .required('Attention : Vous devez mentionner un âge.'),

    benderOrNot: yup.boolean().required(),

    benderSelect: yup.string().when('benderOrNot', {
        is: (value) => value === true,
        then: (schema) => schema.required('Attention : Vous devez sélectionner un élément à maîtriser.'),
    })
})

function FirstIdentitySheet ({formData, handleFormData, nextStep, buttonSize}) {

    const { register, handleSubmit, watch, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const onSubmitOne = async (data) => {
        handleFormData(data);
        nextStep();
    }

    console.log ('je suis button size : ', buttonSize);

    return (

        <div id='firstChapter' className='allChapters'>

            <form id='firstChapterForm' className='chapterForm' onSubmit={handleSubmit(onSubmitOne)}>

                
                {/* <label htmlFor='characterAvatar'>Votre avatar : </label>
                <input type='file' id='characterAvatar' name='characterAvatar' {...register("characterAvatar")}/><br/>
                {errors.characterAvatar && <><span className='invalid-feedback'>{errors.characterAvatar.message}</span><br/></>} */}

                <input
                    type='text'
                    id='characterName'
                    name='characterName'
                    className={kit.inputHarmonistere}
                    placeholder="Le nom de votre personnage"
                    defaultValue='Tintin'
                    {...register("characterName")}/><br/>
                {errors.characterName && <><span className='invalid-feedback'>{errors.characterName.message}</span><br/></>}

                <input
                    type='number'
                    id='characterAge'
                    name='characterAge'
                    className={kit.inputHarmonistere}
                    placeholder="L'âge de votre personnage"
                    defaultValue='53'
                    {...register("characterAge")} /><br/>
                {errors.characterAge && <><span className='invalid-feedback'>{errors.characterAge.message}</span><br/></>}

                <div id='benderDiv'>
                    <label htmlFor='benderOrNot' id='benderBool'>Votre personnage maîtrise-t-il un élément ? </label>
                    <input type='checkbox' id='benderOrNot' name='benderOrNot' {...register("benderOrNot")} /><br/>
                </div>
                
                <div id="disappearBending" className={watch('benderOrNot') ? 'appear' : "disappear"}>
                    <select
                        id="benderSelect"
                        name='benderSelect'
                        className={kit.inputSelectHarmonistere} 
                        {...register("benderSelect")}>

                        <option value='' disabled selected hidden>Choisissez votre élément</option>
                        <option className={kit.optionHarmonistere} value="Terre">Terre</option>
                        <option className={kit.optionHarmonistere} value="Feu">Feu</option>
                        <option className={kit.optionHarmonistere} value="Air">Air</option>
                        <option className={kit.optionHarmonistere} value="Eau">Eau</option>
                    </select><br/>
                    {errors.benderSelect && <><span className='invalid-feedback'>{errors.benderSelect.message}</span><br/></>}

                </div>
                <button className={kit.buttonHarmonistere} style={{padding: `1em ${buttonSize}`}} type='submit'>Étape suivante</button>
            </form>
            
            <div className="sideForm">
                <div className='sideTextForm'>
                    <p>Voici la partie la plus simple ! Posez simplement les informations de votre personnage, vous ne devriez avoir aucun souci.</p>
                </div>
                <img className='iconeQuestion' src={iconeQuestion} alt="icone de point d'interrogation"/>
            </div>

        </div>
    )
}

export default FirstIdentitySheet;