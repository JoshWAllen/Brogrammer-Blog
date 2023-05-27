"use client"

import { useAuthContext } from "@/lib/firebase/auth-context"

function UserStatus() {
  const user = useAuthContext()
  return <h3>{user !== null ? user.displayName : "no user logged in"}</h3>
}

export default UserStatus
