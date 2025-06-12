import React from 'react';
import formKit from '../style/modules/global/form.module.css';

function SearchRelation () {


    return (

        <div>
            <input
                type='text'
                className={formKit.searchbarRelation}
                placeholder='Rechercher un personnage'>
            </input>
        </div>
    )
}

export default SearchRelation;