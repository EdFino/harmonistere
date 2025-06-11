import navbarKit from '../style/modules/components/navbar.module.css';


const SubNavbarCharacter = ({characterInfoPanel, setCharacter, subnavbarPresentation}) => {

    console.log(characterInfoPanel)

    return (
        <ul className={navbarKit.navbarCharacter}>
            <li className={`${navbarKit.navbarCharacterLiDefault} ${
                characterInfoPanel === 1
                ? navbarKit.navbarCharacterLiActive
                : navbarKit.navbarCharacterLi
                
            }`}
            onClick={() => subnavbarPresentation(1)}
        >Profil</li>
            <li className={`${navbarKit.navbarCharacterLiDefault} ${
            characterInfoPanel === 2
            ? navbarKit.navbarCharacterLiActive
            : navbarKit.navbarCharacterLi
            }`}
            onClick={() => subnavbarPresentation(2)}
        >Relations</li>
            <li className={`${navbarKit.navbarCharacterLiDefault} ${
            characterInfoPanel === 3
            ? navbarKit.navbarCharacterLiActive
            : navbarKit.navbarCharacterLi
            }`}
            onClick={() => subnavbarPresentation(3)}
        >Notes</li>
        </ul>
    )
}

export default SubNavbarCharacter;