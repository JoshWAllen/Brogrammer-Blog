import { doc, getFirestore, setDoc } from "firebase/firestore"

import firebase_app from "@/config/firebase"

const db = getFirestore(firebase_app)

interface DatabaseData {
  [key: string]: any //allows object to have any number of properties
}

export async function addDataWithID(
  collection: string,
  id: string,
  data: DatabaseData
) {
  let result = null
  let error = null

  try {
    result = await setDoc(doc(db, collection, id), data, {
      merge: true,
    })
  } catch (e) {
    error = e
  }
  return { result, error }
}
