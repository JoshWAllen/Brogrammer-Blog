import Link from "next/link"
import { DocumentData } from "firebase/firestore"

import { getUserInfo } from "@/lib/firebase/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export async function PostCard({ post }: DocumentData) {
  const userInfo = await getUserInfo(post.authorId)
  return (
    <Link href={`/blog/posts/${post.id}`}>
      <Card className="">
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
          <CardDescription>{userInfo.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>Insert Preview Here</div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </Link>
  )
}
