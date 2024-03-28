import {initializeApp} from 'firebase/app'

import { 
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut
    } from 'firebase/auth'

import {
    getFirestore,
    collection,
    addDoc
    } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBl948kDZk7wSZAF5a4Tvm6MvTCGWhKbLc",
    authDomain: "harmonistere.firebaseapp.com",
    projectId: "harmonistere",
    storageBucket: "harmonistere.appspot.com",
    messagingSenderId: "501642987373",
    appId: "1:501642987373:web:ba799cce069e9768f5bc64",
    measurementId: "G-48316XTHSR"
    }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err)
    }
}

const registerUser = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
        })
        } catch (err) {
            console.error(err)
        }
    }

const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Mail de réinitialisation envoyé !")
    } catch (err) {
        console.error(err)
    }
}

const logOut = () => {
	signOut(auth)
}


export {auth,db,logIn,registerUser, resetPassword, logOut}