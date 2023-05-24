import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth"

import firebase_app from "@/config/firebase"

const auth = getAuth(firebase_app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    console.log(user.displayName)
  } catch (err) {
    console.log(err)
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, signInWithGoogle, logout }
