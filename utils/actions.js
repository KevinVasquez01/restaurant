import { db } from './firebase'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, User} from 'firebase/auth' 
import 'firebase/firestore'
import { getStorage, ref } from 'firebase/storage'
import { fileToBlob } from './helpers'

const auth = getAuth()
const storage = getStorage()

export const isUserLogged = () => {
    let isLogged = false
    onAuthStateChanged(auth, (user) => {
        user !== null && (isLogged = true)
    })

    return isLogged
}

export const registerUser = async(email, password) => {
    const result = {statusResponse: true, error: null}
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = 'Este correo ya ha sido registrado'
    }
    return result
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = {statusResponse: true, error: null}
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = 'Usuario o contraseña invalido'
    }
    return result
}

export const closeSesion = () => {
    return signOut(auth)
}

export const getCurrentUser = () => {
    return auth.currentUser
}

export const uploadImage = async (image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref2 = ref(storage, name)
    const blob = await fileToBlob(image)
    try {
        await ref2.put(blob)
        const url = await ref(storage, `${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result 

}

export const updateProfile = async (data) => {
    const result = { statusResponse: true, error: null }
    try {
        await auth.currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}
