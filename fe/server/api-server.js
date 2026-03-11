import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

  // Very small demo auth — mimic MSW handler
  return res.status(200).json({ user: { email, name: "Demo User" } });
});

app.post("/auth/signup", (req, res) => {
  const { fullName, email, phone, password } = req.body || {};
  if (!email) return res.status(400).json({ message: "Missing email" });

  // Demo signup — return created user object
  return res.status(201).json({ user: { email, name: fullName || "New User", phone } });
});

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});
