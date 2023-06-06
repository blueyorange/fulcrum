import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import home from "./routes/home";

dotenv.config();

const app = express();

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
app.use("home", home);
