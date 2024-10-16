import React from 'react';
import iconeQuestion from '../images/Icone questions.png';

function HelpSection ({stepForm}) {

    let helpMessage;

    switch (stepForm) {
        case 1 :
            helpMessage = "Voici la partie la plus simple ! Posez simplement les informations de votre personnage, vous ne devriez avoir aucun souci.";
            break;
        case 2 :
            helpMessage = "Choisissez ici la personnalité de votre personnage. Vous aurez quatre champs d'importance décroissante (Principal, Ascendant, Neutre, Trait contraire) sur lequel vous pourrez poser une fois chaque élément.";
            break;
        case 3:
            helpMessage = "Vous pouvez maintenant déterminer les qualités et défauts de votre personnage à travers ces six caractéristiques. Vous commencez par défaut en neutre partout, et si vous cherchez à poser un bonus quelque part, il faudra contrebalancer par un défaut. Quant à un bonus critique, il faudra deux défauts pour se le procurer.";
            break;
        default:
            helpMessage = "Erreur de téléchargement";
    }

    return (

        <div className="sideForm">
            <div className='sideTextForm'>
                <p>{helpMessage}</p>
            </div>
            <img className='iconeQuestion' src={iconeQuestion} alt="icone de point d'interrogation"/>
        </div>
    )
}

export default HelpSection;