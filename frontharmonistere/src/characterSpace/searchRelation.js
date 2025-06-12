import React, { useState, useEffect } from 'react';
import formKit from '../style/modules/global/form.module.css';
import axios from 'axios';

function SearchRelation () {

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleSelect(sheet) {
        console.log("Voici votre fiche :", sheet.sheetData.age)
    }

    console.log("Voici votre Query :", query);

    console.log ("Voici vos résultats : ", results[0], results[1])

useEffect(() => {
    if (query.trim().length === 0) {
        setResults([]);
        return;
    }

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5038/api/sheets/search?query=${encodeURIComponent(query)}`);
            setResults(response.data);
        } catch (error) {
            console.error('Erreur lors de la recherche de fiches :', error);
        } finally {
            setLoading(false);
        }
    };

    const delayDebounce = setTimeout(() => {
        fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounce);
}, [query]);



    return (

        <div>
            <input
                type='text'
                className={formKit.searchbarRelation}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <div className={formKit.searchLoading}>Recherche...</div>}
            {results.length > 0 && (
                <ul className={formKit.searchResults}>
                    {results.map((sheet) => (
                        <li key={sheet._id} onClick={() => handleSelect(sheet)}>
                            {sheet.sheetData.characterName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchRelation;