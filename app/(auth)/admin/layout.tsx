"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthContext } from "@/lib/firebase/auth-context"

function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])

  return <div>{children}</div>
}

export default AdminLayout
