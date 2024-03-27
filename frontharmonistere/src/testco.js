import React, { useState, useEffect } from 'react';

const TestCo = () => {
    const [sheetsData, setSheetsData] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les données de la collection "Sheets"
        const fetchSheetsData = async () => {
            try {
                const response = await fetch('/backharmonistere/readSheetsData');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des trucs');
                }
                const data = await response.json();
                setSheetsData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des machins :', error);
            }
        };

        fetchSheetsData();
    }, []);

    return (
        <div>
            <h1>Liste des feuilles de données</h1>
            <ul>
                {sheetsData.map((sheet, index) => (
                    <li key={index}>{sheet.pseudo}</li>
                ))}
            </ul>
        </div>
    );
};

export default TestCo;