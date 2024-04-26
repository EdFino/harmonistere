import React from 'react';
import SubNavbarSheet from './subNavbarSheet';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;

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

function FirstIdentitySheet ({formData, handleFormData, nextStep}) {

    const { register, handleSubmit, watch, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const onSubmitOne = async (data) => {
        handleFormData(data);
        nextStep();
    }

    return (

        <div id='firstChapter'>

            <SubNavbarSheet/>

            <form id='firstChapterForm' onSubmit={handleSubmit(onSubmitOne)}>

                
                {/* <label htmlFor='characterAvatar'>Votre avatar : </label>
                <input type='file' id='characterAvatar' name='characterAvatar' {...register("characterAvatar")}/><br/>
                {errors.characterAvatar && <><span className='invalid-feedback'>{errors.characterAvatar.message}</span><br/></>} */}

                <label htmlFor='characterName'>Le nom de votre personnage : </label>
                <input type='text' id='characterName' name='characterName' {...register("characterName")}/><br/>
                {errors.characterName && <><span className='invalid-feedback'>{errors.characterName.message}</span><br/></>}

                <label htmlFor='characterAge'>L'âge de votre personnage : </label>
                <input type='number' id='characterAge' name='characterAge' {...register("characterAge")} /><br/>
                {errors.characterAge && <><span className='invalid-feedback'>{errors.characterAge.message}</span><br/></>}

                <label htmlFor='benderOrNot'>Votre personnage maîtrise-t-il un élément ? </label>
                <input type='checkbox' id='benderOrNot' name='benderOrNot' {...register("benderOrNot")} /><br/>
                
                <div id="disappearBending" className={watch('benderOrNot') ? 'appear' : "disappear"}>
                    <label htmlFor='benderSelect'>Choisissez votre élément : </label>
                    <select id="benderSelect" name='benderSelect' {...register("benderSelect")}>
                        <option value=''>Choisissez votre élément</option>
                        <option value="Terre">Terre</option>
                        <option value="Feu">Feu</option>
                        <option value="Air">Air</option>
                        <option value="Eau">Eau</option>
                    </select>
                </div>
                <button type='submit'>Suivant</button>
            </form>
                    
            <div className="sideTextForm">
                <p>Voici la partie la plus simple ! Posez simplement les informations de votre personnage, vous ne devriez avoir aucun souci.</p>
            </div>

            <Popup trigger=
            {
            <div id='firstHelp' className='helpPopup'>
            ?
            </div>}
            position="left center">
            <p>Vous ne devriez pas avoir trop de soucis pour cette partie. Sachez cependant que si vous décidez de ne pas joueur
                un harmonistère, vous ne serez pas pénalisés au niveau des règles, elles ont été écrites avec l'idée que tout le monde
                soit sur un pied d'égalité, même les personnages qui ne sont pas doués pour l'action.
            </p>
            </Popup>
        </div>
    )
}

export default FirstIdentitySheet;