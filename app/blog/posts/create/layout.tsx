import { Suspense } from "react"

import ProtectedPage from "@/components/protected-page"

import Loading from "./loading"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProtectedPage redirect_link="/login">{children}</ProtectedPage>
      </Suspense>
    </div>
  )
}

export default Layout
