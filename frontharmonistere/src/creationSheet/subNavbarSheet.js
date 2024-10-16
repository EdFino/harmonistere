import React from 'react';
import subnavbarArrow from '../images/Element graphique.png';
import './subNavbarSheet.css';

const SubNavbarSheet = ({stepForm}) => {

    return (
        <ul id='subNavbarSheet'>
            <li className={stepForm === 1 ? 'stepFormBold' : 'stepFormWeak'}><span className='invisibleMarks'>1/ </span>Identité du personnage</li>
            <li>
                <img className='sheetCreationArrow' src={subnavbarArrow} alt='flèche décorative de la petite barre de navigation pour la création de la fiche'/>
            </li>
            <li className={stepForm === 2 ? 'stepFormBold' : 'stepFormWeak'}><span className='invisibleMarks'>2/ </span>Personnalité</li>
            <li>
                <img className='sheetCreationArrow' src={subnavbarArrow} alt='flèche décorative de la petite barre de navigation pour la création de la fiche'/>
            </li>
            <li className={stepForm === 3 ? 'stepFormBold' : 'stepFormWeak'}><span className='invisibleMarks'>3/ </span>Caractéristiques</li>
            <li>
                <img className='sheetCreationArrow' src={subnavbarArrow} alt='flèche décorative de la petite barre de navigation pour la création de la fiche'/>
            </li>
            <li className={stepForm === 4 ? 'stepFormBold' : 'stepFormWeak'}><span className='invisibleMarks'>4/ </span>Détails</li>
        </ul>
    )
}

export default SubNavbarSheet;