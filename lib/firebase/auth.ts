import {
  GoogleAuthProvider,
  User,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"

import firebase_app from "@/config/firebase"

const auth = getAuth(firebase_app)
const googleProvider = new GoogleAuthProvider()
const db = getFirestore(firebase_app)

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    let userInfo = await getUserInfo(user.uid)
    if (Object.keys(userInfo).length === 0) {
      await createNewUser(user)
    }
  } catch (err) {
    console.log(err)
  }
}

const getCurrentUser = () => {
  const user = auth.currentUser
  return user
}

const createNewUser = async (user: User) => {
  const userData = {
    name: user.displayName,
    uid: user.uid,
  }
  const docRef = await setDoc(doc(db, "users", user.uid), userData)
  return docRef
}

const getUserInfo = async (userId: string) => {
  const docRef = doc(db, "users", userId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return {}
}

const logout = () => {
  signOut(auth)
}

export { signInWithGoogle, getUserInfo, logout }
