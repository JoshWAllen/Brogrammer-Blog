"use client"

import { useState } from "react"
import { DocumentData } from "firebase/firestore"

import { useAuthContext } from "@/lib/firebase/auth-context"
import { createPost, deletePost, getPost } from "@/lib/firebase/posts"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [data, setData] = useState<DocumentData>({})
  const [docRef, setDocRef] = useState("a")
  const user = useAuthContext()
  return (
    <div>
      <h1>Hello!</h1>
      <Button
        onClick={async () => {
          if (user) {
            const post = {
              title: "bigburgertown",
              authorId: user.uid,
              body: "what's up",
            }
            const docId = await createPost(post)
            setDocRef(docId)
            console.log(`added doc with ${docId} ID`)
          }
        }}
      >
        Add Some Data
      </Button>
      <Button
        onClick={async () => {
          const post = await getPost(docRef)
          setData(post)
        }}
      >
        Get Data
      </Button>
      <Button onClick={() => deletePost(docRef)}>Delete Post</Button>
      <div>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>loading</p>}
      </div>
    </div>
  )
}
