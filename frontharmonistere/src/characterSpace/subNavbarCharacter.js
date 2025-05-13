import navbarKit from '../style/modules/components/navbar.module.css';


const SubNavbarCharacter = ({characterInfoPanel}) => {

    return (
        <ul className={navbarKit.navbarCharacter}>
            <li className={`${navbarKit.navbarCharacterLiDefault} ${
            characterInfoPanel === 1
            ? navbarKit.navbarCharacterLiActive
            : navbarKit.navbarCharacterLi
    }`}>Profil</li>
            <li className={`${navbarKit.navbarCharacterLiDefault} ${
            characterInfoPanel === 2
            ? navbarKit.navbarCharacterLiActive
            : navbarKit.navbarCharacterLi
    }`}>Relations</li>
            <li className={`${navbarKit.navbarCharacterLiDefault} ${
            characterInfoPanel === 3
            ? navbarKit.navbarCharacterLiActive
            : navbarKit.navbarCharacterLi
    }`}>Notes</li>
        </ul>
    )
}

export default SubNavbarCharacter;