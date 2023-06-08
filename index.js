import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import "./auth.js";
import home from "./routes/home.js";
import auth from "./routes/auth.js";
import Error from "./views/Error.js";
import mongoose from "mongoose";

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
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.authenticate("session"));

// DATABASE
mongoose.set("strictQuery", true);
//Set up default mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
});

//Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// routes
app.use("/", home);
app.use("/auth", auth);
app.use("*", (req, res, next) => {
  next({ status: 404, message: "Page not found" }, req, res, next);
});
app.use(function (err, req, res, next) {
  return res.status(err.status || 500).send(Error(err));
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
