import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import kit from '../style/kitUI.module.css';
import iconeQuestion from '../images/Icone questions.png';

const schema = yup.object().shape({
    skills: yup.string(),
    physicDescription: yup.string(),
    mentalDescription: yup.string(),
    story: yup.string(),
})

function FourthDescriptionSheet ({formData, handleFormData, nextStep, previousStep, buttonSize}) {

    const { register, handleSubmit, watch, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const onSubmitFour = async (data) => {
        handleFormData(data);
        nextStep();
    }

    return (
        <div id='fourthChapter' className='allChapters'>
            <form id='fourthChapterForm' className='chapterForm' onSubmit={handleSubmit(onSubmitFour)}>

                    <textarea
                        name='skills'
                        id='skills'
                        placeholder='Vos compétences'
                        className={kit.textareaHarmonistere}
                        cols={45}
                        rows={3}
                        {...register("skills")}
                    />
                    {errors.skills && <><span className='invalid-feedback'>{errors.skills.message}</span><br/></>}

                    <textarea
                        name='physicDescription'
                        id='physicDescription'
                        placeholder='Votre physique'
                        className={kit.textareaHarmonistere}
                        cols={45}
                        rows={3}
                        {...register("physicDescription")}
                    />
                    {errors.physicDescription && <><span className='invalid-feedback'>{errors.physicDescription.message}</span><br/></>}

                    <textarea
                        name='mentalDescription'
                        id='mentalDescription'
                        placeholder='Votre personnalité'
                        className={kit.textareaHarmonistere}
                        cols={45}
                        rows={3}
                        {...register("mentalDescription")}
                    />
                    {errors.mentalDescription && <><span className='invalid-feedback'>{errors.mentalDescription.message}</span><br/></>}

                    <textarea
                        name='story'
                        id='story'
                        placeholder="Votre histoire"
                        className={kit.textareaHarmonistere}
                        cols={45}
                        rows={3}
                        {...register("story")}
                    />
                    {errors.story && <><span className='invalid-feedback'>{errors.story.message}</span><br/></>}

                <div className="bottomFormButtons">
                    <span className='previousButton' onClick={() => previousStep()}>Retour</span>
                    <button type='submit' className={kit.buttonHarmonistere} style={{padding: `1em ${buttonSize}`}}>Terminer</button>
                </div>
            </form>
        </div>
    )
}

export default FourthDescriptionSheet;