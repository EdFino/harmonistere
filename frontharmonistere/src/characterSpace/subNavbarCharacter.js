import navbarKit from '../style/modules/components/navbar.module.css';


const SubNavbarCharacter = ({characterInfoPanel}) => {

    return (
        <ul className={navbarKit.navbarCharacter}>
            <li className={characterInfoPanel === 1 ? navbarKit.navbarCharacter : 'stepFormWeak'}>Profil</li>
            <li className={characterInfoPanel === 2 ? 'stepFormBold' : 'stepFormWeak'}>Relations</li>
            <li className={characterInfoPanel === 3 ? 'stepFormBold' : 'stepFormWeak'}>Notes</li>
        </ul>
    )
}

export default SubNavbarCharacter;