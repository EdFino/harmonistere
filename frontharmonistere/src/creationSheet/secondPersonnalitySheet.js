import React, { useState, useEffect } from "react";
import SubNavbarSheet from "./subNavbarSheet";
import Popup from 'reactjs-popup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup" ;
import kit from '../style/kitUI.module.css';
import iconeQuestion from '../images/Icone questions.png';


const schema = yup.object().shape({
    principalTrait: yup.string().required ("Attention : vous devez choisir un trait principal à votre personnage"),
    ascendantTrait: yup.string().required ("Attention : vous devez choisir un trait ascendant à votre personnage"),
    neutralTrait: yup.string().required ("Attention : vous devez choisir un trait neutre à votre personnage"),
    oppositeTrait: yup.string().required ("Attention : vous devez choisir un trait opposé à votre personnage"),
})

const SecondPersonnalitySheet = ({formData, handleFormData, nextStep, previousStep, buttonSize}) => {

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
        <div id='secondChapter' className='allChapters'>
            <form id='secondChapterForm' className='chapterForm' onSubmit={handleSubmit(onSubmitTwo)}>

                <select id="principalTrait" name="principalTrait"  className={kit.inputSelectHarmonistere} {...register("principalTrait")}>
                    <option value='' disabled selected hidden>Votre trait principal</option>
                    {personnalityElementsList.map((element, index) => (
                        <option key={index} value={element} className={kit.optionHarmonistere}>{element}</option>
                    ))}
                </select><br/>
                {errors.principalTrait && <><span className='invalid-feedback'>{errors.principalTrait.message}</span><br/></>}

                <select id="ascendantTrait" name="ascendantTrait" className={kit.inputSelectHarmonistere} {...register("ascendantTrait")}>
                    <option value='' disabled selected hidden>Votre trait ascendant</option>
                    {availableElementsAscendant.map((element, index) => (
                        <option key={index} value={element} className={kit.optionHarmonistere}>{element}</option>
                    ))}
                </select><br/>
                {errors.ascendantTrait && <><span className='invalid-feedback'>{errors.ascendantTrait.message}</span><br/></>}

                <select id="neutralTrait" name="neutralTrait" className={kit.inputSelectHarmonistere} {...register("neutralTrait")}>
                    <option value='' disabled selected hidden>Votre trait neutre</option>
                    {availableElementsNeutral.map((element, index) => (
                        <option key={index} value={element} className={kit.optionHarmonistere}>{element}</option>
                    ))}
                </select><br/>
                {errors.neutralTrait && <><span className='invalid-feedback'>{errors.neutralTrait.message}</span><br/></>}

                <select id="oppositeTrait" name="oppositeTrait" className={kit.inputSelectHarmonistere} {...register("oppositeTrait")}>
                    <option value='' disabled selected hidden>Votre trait contraire : </option>
                    {availableElementsOpposite.map((element, index) => (
                        <option key={index} value={element} className={kit.optionHarmonistere}>{element}</option>
                    ))}
                </select><br/>
                {errors.oppositeTrait && <><span className='invalid-feedback'>{errors.oppositeTrait.message}</span><br/></>}

                <div className="bottomFormButtons">
                    <span className='previousButton' onClick={() => previousStep()}>Retour</span>
                    <button type='submit' className={kit.buttonHarmonistere} style={{padding: `1em ${buttonSize}`}}>Étape suivante</button>
                </div>

            </form>

        </div>

        
    );
}

export default SecondPersonnalitySheet;