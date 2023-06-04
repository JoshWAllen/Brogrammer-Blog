"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentData } from "firebase/firestore"

import { useAuthContext } from "@/lib/firebase/auth-context"
import { getPost } from "@/lib/firebase/posts"

function Page({ params }: { params: { postid: string } }) {
  const user = useAuthContext()
  const router = useRouter()
  const [post, setPost] = useState<DocumentData | null | undefined>(null)

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(params.postid)
      setPost(post)
    }
    if (params.postid) {
      fetchPost()
    }
  }, [params.postid])
  return (
    <>
      <div>
        <h1>{params.postid}</h1>
      </div>
      <div>
        {post ? <pre>{JSON.stringify(post, null, 2)}</pre> : <p>loading</p>}
      </div>
    </>
  )
}

export default Page
