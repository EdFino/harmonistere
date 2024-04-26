import React, { useState, useEffect } from "react";
import SubNavbarSheet from "./subNavbarSheet";
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;

const schema = yup.object().shape({
    principalTrait: yup.string().required ("Attention : vous devez choisir un trait principal à votre personnage"),
    ascendantTrait: yup.string().required ("Attention : vous devez choisir un trait ascendant à votre personnage"),
    neutralTrait: yup.string().required ("Attention : vous devez choisir un trait neutre à votre personnage"),
    oppositeTrait: yup.string().required ("Attention : vous devez choisir un trait opposé à votre personnage"),
})

const SecondPersonnalitySheet = ({formData, handleFormData, nextStep, previousStep}) => {

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitted, isSubmitSuccessful } } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    console.log ('quel est le problème ?', errors)


    const [availableElementsAscendant, setAvailableElementsAscendant] = useState(['Terre', 'Feu', 'Air', 'Eau']);
    const [availableElementsNeutral, setAvailableElementsNeutral] = useState(['Terre', 'Feu', 'Air', 'Eau']);
    const [availableElementsOpposite, setAvailableElementsOpposite] = useState(['Terre', 'Feu', 'Air', 'Eau']);

    useEffect(() => {
        const updatedAvailableElementsAscendant = personnalityElementsList.filter(element => {
            return element !== watch("principalTrait");
        });
        setAvailableElementsAscendant(updatedAvailableElementsAscendant);
        setValue("ascendantTrait", "");
        setValue("neutralTrait", "");
        setValue("oppositeTrait", "");
    }, [watch("principalTrait")]);

    useEffect(() => {
        const updatedAvailableElementsNeutral = availableElementsAscendant.filter(element => {
            return element !== watch("principalTrait") && element !== watch("ascendantTrait");
        });
        setAvailableElementsNeutral(updatedAvailableElementsNeutral);
        setValue("neutralTrait", "");
        setValue("oppositeTrait", "");
    }, [watch("principalTrait"), watch("ascendantTrait")]);

    useEffect(() => {
        const updatedAvailableElementsOpposite = availableElementsNeutral.filter(element => {
            return element !== watch("principalTrait") && element !== watch("ascendantTrait") && element !== watch("neutralTrait");
        });
        setAvailableElementsOpposite(updatedAvailableElementsOpposite);
        setValue("oppositeTrait", "");
    }, [watch("principalTrait"), watch("ascendantTrait"), watch("neutralTrait")]);

    const personnalityElementsList = ['Terre', 'Feu', 'Air', 'Eau'];

    function resetCharac() {
        setValue('principalTrait')
        setValue("ascendantTrait", "");
        setValue("neutralTrait", "");
        setValue("oppositeTrait", "");
    }

    const onSubmitTwo = async (data) => {
        handleFormData(data);
        nextStep();
    }

    return (
        <div id='secondChapter'>
            <SubNavbarSheet/>
            <form id='secondChapterForm' onSubmit={handleSubmit(onSubmitTwo)}>

                <label htmlFor='principalTrait'>Choisissez votre trait principal : </label>
                <select id="principalTrait" name="principalTrait" {...register("principalTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {personnalityElementsList.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.principalTrait && <><span className='invalid-feedback'>{errors.principalTrait.message}</span><br/></>}

                <label htmlFor='ascendantTrait'>Choisissez votre ascendant : </label>
                <select id="ascendantTrait" name="ascendantTrait" {...register("ascendantTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsAscendant.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.ascendantTrait && <><span className='invalid-feedback'>{errors.ascendantTrait.message}</span><br/></>}

                <label htmlFor='neutralTrait'>Choisissez votre trait neutre : </label>
                <select id="neutralTrait" name="neutralTrait" {...register("neutralTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsNeutral.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.neutralTrait && <><span className='invalid-feedback'>{errors.neutralTrait.message}</span><br/></>}

                <label htmlFor='oppositeTrait'>Choisissez votre trait contraire : </label>
                <select id="oppositeTrait" name="oppositeTrait" {...register("oppositeTrait")}>
                    <option value=''>Choisissez un élément dans la liste : </option>
                    {availableElementsOpposite.map((element, index) => (
                        <option key={index} value={element}>{element}</option>
                    ))}
                </select><br/>
                {errors.oppositeTrait && <><span className='invalid-feedback'>{errors.oppositeTrait.message}</span><br/></>}

                <button type='button' onClick={resetCharac}>Réinitialiser les valeurs</button>
                <button type='button' onClick={() => previousStep()}>Retour</button>
                <button type='submit'>Suivant</button>

            </form>

            <div className="sideTextForm">
                <p>Choisissez ici la personnalité de votre personnage. Vous aurez quatre champs d'importance décroissante
                (Principal, Ascendant, Neutre, Trait contraire) sur lequel vous pourrez poser une fois chaque élément.</p>
            </div>

            <Popup trigger=
            {
            <div id='secondHelp' className='helpPopup'>
                ?
            </div>}
            position="left center">
                <p>
                    Principal : Le trait le plus important de votre personnage, l'élément qui le caractérise le plus, l'état émotionnel dans lequel il se sent le plus à l'aise.<br/>
                    Ascendant : Le trait secondaire qui le définit selon une relative importance.<br/>
                    Neutre : Correspond à l'élément avec lequel il n'a pas énormément d'affinités. Votre personnage n'est pas connu pour réagir ainsi.<br/>
                    Trait opposé : Votre personnage est tout sauf cet élément. C'est plutôt inhabituel de le voir ainsi. Comprenez que l'élément que vous poserez n'est pas obligatoirement l'inverse de celui que vous aurez mis en principal.<br/>
                    Terre : L'élément de la résilience, du rationnalisme, du concret, de la force tranquille, du calme, de l'ordre.
                    Feu : L'élément de la passion, de la force, du courage, de la vitalité, de l'intimidation, du défi.
                    Air : L'élément de la spiritualité, de l'introspection, de l'adaptation, du voyage, de la curiosité.
                    Eau : L'élément du lien, de l'empathie, de la diplomatie, du changement, de la vie, de l'amour.
                </p>
            </Popup>
        </div>

        
    );
}

export default SecondPersonnalitySheet;