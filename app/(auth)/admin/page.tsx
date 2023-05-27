"use client"

import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

function Page() {
  return (
    <div>
      <h1>Only logged in users can view this page</h1>
      <Link href="/admin/modifyDB" className={buttonVariants({ size: "lg" })}>
        Interact with the Database
      </Link>
    </div>
  )
}

export default Page
