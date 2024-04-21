import React, { useState } from 'react'

function FourthChapterSheet ({onNotesSheet, register, errors, watch}) {

    return (
        <div id='textarea-group'>
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


            <div id='textareaNotes' className='textarea-fourth'>
                <p>Vos notes :</p>
                <textarea
                    name='notes'
                    id='notes'
                    placeholder="C'est votre espace, écrivez ce que vous souhaitez dedans...
                    ce que vous souhaitez dedans..."
                    cols={75}
                    rows={12}
                    {...register("notes")}
                />
                {errors.notes && <><span className='invalid-feedback'>{errors.notes.message}</span><br/></>}
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
        </div>
    )
}

export default FourthChapterSheet;