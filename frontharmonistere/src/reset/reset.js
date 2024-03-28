import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"
import { auth, resetPassword } from "../assets/firebase"

function Reset(){
    
    const [email, setEmail] = useState("")
    const [user,error] = useAuthState(auth)

    const navigate = useNavigate()

    return (
        <div>
            <input type="text" value={email} placeholder="adresse mail" onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => resetPassword(email)}>Réinitialiser le mot de passe par mail</button>
        </div>
    )   
}

export default Reset;