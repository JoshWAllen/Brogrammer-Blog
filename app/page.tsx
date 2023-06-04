import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <>
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl og:text-6xl">
          Brogrammer Blog
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          A place to share wisdom with the boys about gym, coding, and life.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={`${siteConfig.links.blog}/posts`}
          className={buttonVariants({ size: "lg" })}
        >
          Enlightenment
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          Github
        </Link>
      </div>
    </>
  )
}
