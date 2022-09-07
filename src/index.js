const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["oauthmaps"],
    maxAge: 24 * 60 * 60 * 100, // 1 day
  })
);

app.use(
  cors({
    origin: "http://localhost:8080", // client
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// routes
app.use("/auth", authRoute);

// production (client)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(`${__dirname}/public`));
}

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));
