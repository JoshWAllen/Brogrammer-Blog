"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { addData, addDataWithID } from "@/lib/firebase/addData"
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    addData("posts", values)
    //redirect to another
    //should validate that addData goes through
    toast({
      title: "Post Created!",
      description: "Check the posts page to view and edit",
      action: <ToastAction altText="Undo">Close</ToastAction>,
    })
    router.push("/blog/posts")
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
                  <Input placeholder="How I Broke out of Hell" {...field} />
                </FormControl>
                <FormDescription>
                  Captivate your audience with a juicy title
                </FormDescription>
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
                    placeholder="Tutorial hell is a real place, but most beginner programmers don't even know they're in it!"
                    className=""
                    {...field}
                  />
                </FormControl>
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
