import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestCo() {
    const [sheetsData, setSheetsData] = useState([]);

    useEffect(() => {
        // Effectue une requête GET pour récupérer les données des feuilles depuis votre API
        axios.get('http://localhost:5038/backharmonistere/readSheetsData')
            .then(response => {
                setSheetsData(response.data); // Met à jour les données avec la réponse de l'API
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });
    }, []); // Exécuté une seule fois après le rendu initial

    return (
        <div>
            <h2>Données des feuilles :</h2>
            <ul>
                {sheetsData.map(sheet => (
                    <li key={sheet._id}>
                        {/* Affiche les différentes propriétés de chaque feuille */}
                        <p>Titre : {sheet.pseudo}</p>
                        <p>Description : {sheet.email}</p>
                        {/* Ajoutez d'autres propriétés ici */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestCo;
