"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DocumentData } from "firebase/firestore"

import { useAuthContext } from "@/lib/firebase/auth-context"
import { getDocument } from "@/lib/firebase/getData"

function Page({ params }: { params: { postid: string } }) {
  const user = useAuthContext()
  const router = useRouter()
  const [post, setPost] = useState<DocumentData | null | undefined>(null)

  useEffect(() => {
    if (!user) router.push("/")
    const fetchPost = async () => {
      const post = await getDocument("posts", params.postid)
      console.log("post: ", post)
      setPost(post?.data())
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
