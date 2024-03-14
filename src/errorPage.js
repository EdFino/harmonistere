import { useRouteError } from 'react-router-dom'

export default function ErrorPage(){

	const error = useRouteError()

	console.log(error)

	return(
	   <div>
	    	<h1>Vous êtes perdu, voyageur ?</h1>
		    <p>Partons retrouver votre chemin</p>
		    <p>{error.error.message}</p>
     </div>
  )
}