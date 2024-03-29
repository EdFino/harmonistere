import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../assets/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function PlayerSpace () {

    const [user, error] = useAuthState(auth);
    const [characterList, setCharacterList] = useState([]);

    useEffect(() => {
        // Logique pour récupérer les données de Sheets ici...
        if (user) {
            axios.get(`http://localhost:5038/backharmonistere/readSheetsData?email=${user.email}`)
                .then(response => {
                    setCharacterList(response.data);    
                    // Supposons que vous ayez récupéré les données dans une variable nommée sheetsData
                    if (response.data.length > 0) {
                        const data = response.data[0];
                    }
                })
                .catch(error => {
                    console.log('Erreur lors de la récupération des données : ', error);
                });
        }
    }, [user]);

    console.log ('chocolat : ', characterList);


  return (
    <>
    <Navbar/>
    <h1>Votre espace</h1>
    <p>Allons dans l'espace fiche, imaginons que c'est beau ici et allons là = </p>
{/*     <Link to={'/espacefiche'}><button>Votre première fiche : JD, le maître du feu</button></Link> */}
    {characterList.map ((character, index) => (
        <Link to={`/espacefiche/${character._id}`}> <button key={index}>{character.name}</button><br/></Link>
    ))}
{}    </>
  )
}

export default PlayerSpace;