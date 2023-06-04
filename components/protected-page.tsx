"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useAuthContext } from "@/lib/firebase/auth-context"

interface ProtectedPageProps {
  children: ReactNode
  redirect_link: string
}

function ProtectedPage({ children, redirect_link }: ProtectedPageProps) {
  const user = useAuthContext()
  const router = useRouter()
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  useEffect(() => {
    if (user === null) {
      router.push(redirect_link)
    }
    setUserLoggedIn(true)
  }, [])
  return <>{!userLoggedIn ? <div></div> : children}</>
}

export default ProtectedPage
