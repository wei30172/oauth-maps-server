const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const authRoute = require("./src/routes/auth");
const history = require("connect-history-api-fallback");
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
    origin: process.env.CLIENT_URL, // client
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// routes
app.use("/auth", authRoute);

// production (client)
if (process.env.NODE_ENV === "production") {
  app.use(history());
  app.use(express.static(`${__dirname}/public`));
}

app.listen(PORT, () => console.log(`app started on port: ${PORT}`));
