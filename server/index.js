const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(cookieParser());

// CORS for local dev (client on 5173)
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, // allow cookies
    })
);

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});