import './home.css';
import { Link } from 'react-router-dom';
import harmonistereHome from '../images/harmonistereHome.jpg';
import React from 'react';
import useNoScrollFunction from '../noScrollFunction';
    // Ajoutez la classe 'no-scroll' à l'élément body lorsque ce composant est rend

function Home() {
    useNoScrollFunction();
  return (
    <div className="App">
      <img id="homeArt" src={harmonistereHome} alt="Ecran de la page principale" />
      <h1 id="mainPageTitle">HARMONISTERE</h1>
      <div id="mainMenu">
        <ul id="ulMenu">
            <li>Connexion à votre compte</li>
            <Link to={'creationdecompte'}><li>Création de votre compte</li></Link>
            <Link to={'univers'}><li>L'univers</li></Link>
            <Link to={'creationdecompte'}><li>Créer une fiche</li></Link>
            <Link to={'creationdecompte'}><li>Vos fiches</li></Link>
            <Link to={'creationdecompte'}><li>Vos parties</li></Link>
            <Link to={'creationdecompte'}><li>Lanceur de dés</li></Link>
        </ul>
      </div>
    </div>
  );
}

export default Home;
