import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;

const schema = yup.object().shape({
    skills: yup.string(),
    physicDescription: yup.string(),
    mentalDescription: yup.string(),
    story: yup.string(),
})

function FourthDescriptionSheet ({formData, handleFormData, nextStep, previousStep}) {

    const { register, handleSubmit, watch, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const onSubmitFour = async (data) => {
        handleFormData(data);
        nextStep();
    }

    return (
        <div id='fourthChapter'>
            <form id='fourthChapterForm' onSubmit={handleSubmit(onSubmitFour)}>

                <div id='textareaSkills' className='textarea-fourth'>
                    <p>Vos compétences :</p>
                    <textarea
                        name='skills'
                        id='skills'
                        placeholder='Ecrivez ici vos compétences'
                        cols={75}
                        rows={12}
                        {...register("skills")}
                    />
                    {errors.skills && <><span className='invalid-feedback'>{errors.skills.message}</span><br/></>}
                </div>


                <div id='textareaPhysic' className='textarea-fourth'>
                    <p>Votre physique :</p>
                    <textarea
                        name='physicDescription'
                        id='physicDescription'
                        placeholder='Décrivez plus en détail le physique votre personnage'
                        cols={75}
                        rows={12}
                        {...register("physicDescription")}
                    />
                    {errors.physicDescription && <><span className='invalid-feedback'>{errors.physicDescription.message}</span><br/></>}
                </div>

                <div id='textareaPersonnality' className='textarea-fourth'>
                    <p>Votre personnalité :</p>
                    <textarea
                        name='mentalDescription'
                        id='mentalDescription'
                        placeholder='Décrivez ici la personnalité de votre personnage ; cette partie sera cachée par défaut aux autres joueurs'
                        cols={75}
                        rows={12}
                        {...register("mentalDescription")}
                    />
                    {errors.mentalDescription && <><span className='invalid-feedback'>{errors.mentalDescription.message}</span><br/></>}

                </div>

                <div id='textareaHistory' className='textarea-fourth'>
                    <p>Votre histoire :</p>
                    <textarea
                        name='story'
                        id='story'
                        placeholder="Cet espace est réservé à l'histoire de votre personnage ; cette partie sera cachée par défaut aux autres joueurs"
                        cols={75}
                        rows={12}
                        {...register("story")}
                    />
                    {errors.story && <><span className='invalid-feedback'>{errors.story.message}</span><br/></>}

                </div>

                <button type='button' onClick={() => previousStep()}>Retour</button>
                <button type='submit'>Suivant</button>
            </form>
            <div className="sideTextForm">
                <p>
                    Vous n'êtes pas obligés de remplir ces champs pour la validation de la fiche.
                    Mais si vous trouvez l'inspiration plus tard et que vous possédez un compte, vous pourrez toujours les modifier dans votre espace jeu.
                </p>
            </div> 
        </div>
    )
}

export default FourthDescriptionSheet;