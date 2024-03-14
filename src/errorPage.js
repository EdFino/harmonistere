import { useRouteError, Link } from 'react-router-dom';
import harmonistereError from './images/harmonistereError.jpg';
import './errorPage.css';
import useNoScrollFunction from './noScrollFunction';

export default function ErrorPage(){
	useNoScrollFunction();

	return(
	   <div>
			<img id="errorArt" src={harmonistereError} alt='Ouaip' />
			<div id="textError">
				<h1>Vous êtes perdu, voyageur ?</h1>
				<p>Partez par ici, vous retrouverez votre route : <Link to={'/'}>Page d'accueil</Link></p>
			</div>
	    </div>
  )
}