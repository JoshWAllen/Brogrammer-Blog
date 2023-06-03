import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export default function Page() {
  return (
    <>
      <h1>Hello, Blog Page!</h1>
      <div className="flex gap-4">
        <Link href="/blog/posts/" className={buttonVariants({ size: "lg" })}>
          See Posts
        </Link>
        <Link
          href="/blog/posts/create"
          className={buttonVariants({ size: "lg" })}
        >
          Create Post
        </Link>
      </div>
    </>
  )
}
