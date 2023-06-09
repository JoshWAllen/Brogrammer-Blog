"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useAuthContext } from "@/lib/firebase/auth-context"
import { createPost } from "@/lib/firebase/posts"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title cannot be left blank.",
  }),
  body: z.string().min(1, {
    message: "Body needs to be at least 1 character",
  }),
})

export default function ProfileForm() {
  const user = useAuthContext()
  const router = useRouter()
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!user) {
      router.push("/")
    } else {
      const docId = await createPost({ ...values, authorId: user?.uid }) //maybe should append current user in createPost function
      //redirect to another
      //should validate that createPost goes through
      toast({
        title: "Post Created!",
        description:
          "Check the posts page to view and edit. It may take a few minutes to show up.",
        action: <ToastAction altText="Undo">Close</ToastAction>,
      })
      router.push(`/blog/posts/${docId}`)
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 m-auto space-y-8 md:w-2/3 xl:w-1/2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="What did you learn?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Talk about anything you like!"
                    className=""
                    rows={30}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Markdown Support Coming Soon...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Post</Button>
        </form>
      </Form>
    </>
  )
}
