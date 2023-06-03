import { getAllPosts } from "@/lib/firebase/posts"
import { PostCard } from "@/components/post-card"

async function page() {
  const posts = await getAllPosts()
  return (
    <div className="flex flex-wrap">
      {posts.map((post) => {
        return (
          <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            {/* @ts-expect-error Server Component */}
            <PostCard post={post} />
          </div>
        )
      })}
    </div>
  )
}

export default page
