const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("./auth")

const USER = {
  id: "1",
  email: "test@example.com",
  password: "password123",
}

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cookieParser())

// CORS for local dev (client on 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies
  })
)

app.get("/health", (req, res) => res.json({ ok: true }))

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body

  if (email !== USER.email || password !== USER.password) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const accessToken = signAccessToken({ sub: USER.id })
  const refreshToken = signRefreshToken({ sub: USER.id })

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  })

  res.json({ accessToken })
})

app.post("/auth/refresh", (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.sendStatus(401)

  try {
    const payload = verifyRefreshToken(token)
    const accessToken = signAccessToken({ sub: payload.sub })
    res.json({ accessToken })
  } catch {
    res.sendStatus(401)
  }
})

app.post("/auth/logout", (req, res) => {
  res.clearCookie("refreshToken")
  res.sendStatus(204)
})

app.get("/protected", (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.sendStatus(401)

  try {
    const token = auth.replace("Bearer ", "")
    verifyAccessToken(token)
    res.json({ secret: "You made it" })
  } catch {
    res.sendStatus(401)
  }
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
