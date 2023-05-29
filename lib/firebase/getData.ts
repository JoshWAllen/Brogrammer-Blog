import { getAuth } from "firebase/auth"
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore"

import firebase_app from "@/config/firebase"

const db = getFirestore(firebase_app)

export async function getDocument(userCollection: string, id: string) {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return null

  const docRef = doc(db, "users", user.uid, userCollection, id)

  let result = null
  let error = null

  try {
    result = await getDoc(docRef)
  } catch (e) {
    error = e
  }
  return result
}

export async function getCollection(userCollection: string) {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return null

  const querySnapshot = await getDocs(
    collection(db, "users", user.uid, userCollection)
  )
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data())
  })
  return querySnapshot
}
