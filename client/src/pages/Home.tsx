import { useEffect, useState } from "react"
import { pingServer } from "../lib/api"

export default function Home() {
  const [status, setStatus] = useState<string>("Checking server...")

  useEffect(() => {
    let mounted = true
    pingServer()
      .then((d) => mounted && setStatus(d.ok ? "Server OK" : "Server not OK"))
      .catch(() => mounted && setStatus("Server not reachable"))
    return () => {
      mounted = false
    }
  })
  return (
    <>
      <h1>Mini Secure Portal</h1>
      <p>{status}</p>
    </>
  )
}
