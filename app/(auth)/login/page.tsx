"use client"

import { logout } from "@/lib/firebase/auth"
import { Button } from "@/components/ui/button"
import LoginButton from "@/components/login-button"

function Page() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <LoginButton />
      <Button onClick={() => logout()}>logout</Button>
    </div>
  )
}

export default Page
