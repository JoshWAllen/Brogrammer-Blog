import Link from "next/link"

import { getAllPosts } from "@/lib/firebase/posts"

async function page() {
  const posts = await getAllPosts()
  console.log("all posts fetched from firebase:", posts)
  return (
    <div>
      {posts.map((post) => {
        return (
          <div>
            {post ? (
              <Link href={`/blog/posts/${post.id}`}>
                <pre>{JSON.stringify(post, null, 2)}</pre>{" "}
              </Link>
            ) : (
              <p>loading</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default page
