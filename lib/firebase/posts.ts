import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore"

import { BlogPost } from "@/types/post"
import firebase_app from "@/config/firebase"

const db = getFirestore(firebase_app)

export async function createPost(data: BlogPost) {
  const docRef = await addDoc(collection(db, "posts"), data)
  const docId = docRef.id
  return docId
}

export async function getPost(postId: string) {
  const docRef = doc(db, "posts", postId)
  const docSnap = await getDoc(docRef)
  let data: DocumentData = {
    //possible use zod to check data is type blog
    title: "NA",
    body: "NA",
    authorId: "NA",
  }
  if (docSnap.exists()) {
    data = docSnap.data()
  } else {
    console.log("no such document")
  }
  return data
}

export async function getAllPosts() {
  const collectionRef = collection(db, "posts")
  const querySnapshot = await getDocs(collectionRef)
  const documents: DocumentData[] = []
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() })
  })
  return documents
}

export async function deletePost(postId: string) {
  //Note: Deleting a document does not delete its subcollections in firestore.
  const docRef = doc(db, "posts", postId)
  await deleteDoc(docRef)
}
