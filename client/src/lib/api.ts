export async function pingServer() {
  const res = await fetch("http://localhost:3001/health", {
    credentials: "include",
  })
  if (!res.ok) throw new Error("Server not reachable")
  return res.json() as Promise<{ ok: boolean }>
}
