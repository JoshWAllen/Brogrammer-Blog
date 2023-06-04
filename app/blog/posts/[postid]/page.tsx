"use client"

import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"

import { getUserInfo } from "@/lib/firebase/auth"
import { getPost } from "@/lib/firebase/posts"

function Page({ params }: { params: { postid: string } }) {
  const [post, setPost] = useState<DocumentData | null | undefined>(null)
  const [authorInfo, setAuthorInfo] = useState<DocumentData | null>(null)
  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPost(params.postid)
      setPost(post)
      const author = await getUserInfo(post.authorId)
      setAuthorInfo(author)
    }
    if (params.postid) {
      fetchPost()
    }
  }, [params.postid])
  return (
    <>
      {post ? (
        <div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground sm: text-xl">
            {authorInfo ? authorInfo.name : "Loading ..."}
          </p>
          <p className="my-4 text-lg md:text-xl md:leading-8">{post.body}</p>
        </div>
      ) : (
        <p>loading</p>
      )}
    </>
  )
}

export default Page
