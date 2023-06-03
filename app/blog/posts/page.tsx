import Link from "next/link"

import { getAllPosts } from "@/lib/firebase/posts"
import { PostCard } from "@/components/post-card"

async function page() {
  const posts = await getAllPosts()
  console.log("all posts fetched from firebase:", posts)
  return (
    <div className="flex flex-wrap">
      {posts.map((post) => {
        return (
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <PostCard post={post} />
          </div>
        )
      })}
      {/* {posts.map((post) => {
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
      })} */}
    </div>
  )
}

export default page
