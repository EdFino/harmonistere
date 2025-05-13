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
        case 4:
            helpMessage = "Vous n'êtes pas obligés de remplir ces champs pour la validation de la fiche. Mais si vous trouvez l'inspiration plus tard et que vous possédez un compte, vous pourrez toujours les modifier dans votre espace jeu";
            break;
        case 5:
            helpMessage = "Voyez si la fiche vous convient et que les informations vous satisfons. Si oui, validez !"
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