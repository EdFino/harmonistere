import './home.css';
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <div className="App">
      <img id="homeArt" src="./harmonistereHome.jpg" alt="Ecran de la page principale" />
      <h1 id="mainPageTitle">HARMONISTERE</h1>
      <div id="mainMenu">
        <ul id="ulMenu">
            <li>Connexion à votre compte</li>
            <li>Création de votre compte</li>
            <Link to={'univers'}><li>L'univers</li></Link>
            <li>Créer une fiche</li>
            <li>Vos fiches</li>
            <li>Vos parties</li>
            <li>Lanceur de dés</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
