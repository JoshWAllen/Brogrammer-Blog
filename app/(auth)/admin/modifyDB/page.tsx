"use client"

import { useState } from "react"
import { DocumentData, DocumentSnapshot } from "firebase/firestore"

import { addDataWithID } from "@/lib/firebase/addData"
import { getDocument } from "@/lib/firebase/getData"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [data, setData] = useState<DocumentData | null | undefined>()
  return (
    <div>
      <h1>Hello!</h1>
      <Button
        onClick={async () => {
          await addDataWithID("users", "josh", {
            hello: "Game of Thrones",
          })
        }}
      >
        Add Some Data
      </Button>
      <Button
        onClick={async () => {
          const { result, error } = await getDocument("users", "josh")
          setData(result?.data())
          if (result?.exists()) {
            console.log(typeof result.data())
          }
        }}
      >
        Get Data
      </Button>
      <div>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>loading</p>}
      </div>
    </div>
  )
}
