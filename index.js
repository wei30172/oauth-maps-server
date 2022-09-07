const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// routes
app.use("/auth", authRoute);

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));
