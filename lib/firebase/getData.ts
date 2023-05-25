import { doc, getDoc, getFirestore } from "firebase/firestore"

import firebase_app from "@/config/firebase"

const db = getFirestore(firebase_app)

export async function getDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id)

  let result = null
  let error = null

  try {
    result = await getDoc(docRef)
  } catch (e) {
    error = e
  }
  return { result, error }
}
