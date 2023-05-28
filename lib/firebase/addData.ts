import { getAuth } from "firebase/auth"
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore"
import { string } from "mathjs"

import firebase_app from "@/config/firebase"

const db = getFirestore(firebase_app)

interface DatabaseData {
  [key: string]: any //allows object to have any number of properties
}

export async function addData(userCollection: string, data: DatabaseData) {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return null

  let result = null
  let error = null

  try {
    result = await addDoc(
      collection(db, "users", user.uid, userCollection),
      data
    )
  } catch (e) {
    error = e
  }
  return { result, error }
}

export async function addDataWithID(
  collection: string,
  id: string,
  data: DatabaseData
) {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) return null

  let result = null
  let error = null

  try {
    result = await setDoc(doc(db, "users", user.uid, collection, id), data, {
      merge: true,
    })
  } catch (e) {
    error = e
  }
  return { result, error }
}
