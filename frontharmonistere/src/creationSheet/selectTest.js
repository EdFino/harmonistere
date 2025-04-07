import React, { useState, useEffect } from "react";

const SelectTest = ({ onTraitsChange, initialTraits }) => {
    const elements = ['Terre', 'Feu', 'Air', 'Eau'];
    const [traits, setTraits] = useState({
        principalTrait: initialTraits?.principal || '',
        ascendantTrait: initialTraits?.ascendant || '',
        neutralTrait: initialTraits?.neutral || '',
        oppositeTrait: initialTraits?.opposite || '',
    });

    // Met à jour les traits et notifie le parent
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTraits((prevTraits) => {
            const updatedTraits = { ...prevTraits, [name]: value };
            onTraitsChange(updatedTraits); // Envoie les données au parent
            return updatedTraits;
        });
    };

    // Filtre les options disponibles pour chaque champ
    const getAvailableOptions = (currentTrait) => {
        return elements.filter(
            (element) => !Object.values(traits).includes(element) || traits[currentTrait] === element
        );
    };

    return (
        <div id="selectTest">
            <h2>Personnalité</h2>
            <div>
                <label htmlFor="principalTrait">Trait principal :</label>
                <select
                    id="principalTrait"
                    name="principalTrait"
                    value={traits.principalTrait}
                    onChange={handleChange}
                >
                    <option value="">Choisissez un élément</option>
                    {getAvailableOptions('principalTrait').map((element, index) => (
                        <option key={index} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="ascendantTrait">Trait ascendant :</label>
                <select
                    id="ascendantTrait"
                    name="ascendantTrait"
                    value={traits.ascendantTrait}
                    onChange={handleChange}
                >
                    <option value="">Choisissez un élément</option>
                    {getAvailableOptions('ascendantTrait').map((element, index) => (
                        <option key={index} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="neutralTrait">Trait neutre :</label>
                <select
                    id="neutralTrait"
                    name="neutralTrait"
                    value={traits.neutralTrait}
                    onChange={handleChange}
                >
                    <option value="">Choisissez un élément</option>
                    {getAvailableOptions('neutralTrait').map((element, index) => (
                        <option key={index} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="oppositeTrait">Trait opposé :</label>
                <select
                    id="oppositeTrait"
                    name="oppositeTrait"
                    value={traits.oppositeTrait}
                    onChange={handleChange}
                >
                    <option value="">Choisissez un élément</option>
                    {getAvailableOptions('oppositeTrait').map((element, index) => (
                        <option key={index} value={element}>
                            {element}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectTest;