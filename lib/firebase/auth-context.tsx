"use client"

//look at NextJS docs to refactor context to minimize client components
import { createContext, useContext, useEffect, useState } from "react"
import { User, getAuth, onAuthStateChanged } from "firebase/auth"

import firebase_app from "@/config/firebase"

const auth = getAuth(firebase_app)

export const AuthContext = createContext<User | null>(null)

export const useAuthContext = () => useContext(AuthContext)

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //set up auth observer. Returns unsubscribe function to be called when component unmounted.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {loading ? <div>Loading</div> : children}
    </AuthContext.Provider>
  )
}
