import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import home from "./routes/home.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: use proper store, not in-memory one
// TODO: use secret stored in .env
const sessionMiddleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
});

// middleware
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.authenticate("session"));

// routes
app.use("/", home);
app.use("/auth", auth);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
