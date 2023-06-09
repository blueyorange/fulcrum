import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import "./config.js";
import passport from "passport";
import "./auth.js";
import home from "./routes/home.js";
import auth from "./routes/auth.js";
import student from "./routes/student.js";
import teacher from "./routes/teacher.js";
import api from "./routes/api.js";
import Error from "./views/Error.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// TODO: use proper store, not in-memory one
// TODO: use secret stored in .env
const sessionMiddleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  // cookie: {secure: true} // for use with HTTPS
});
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(passport.session());
app.use(express.json());

// DATABASE
mongoose.set("strictQuery", true);
//Set up default mongoose connection
try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ignoreUndefined: true,
  });
} catch (err) {
  console.err("Unhandled error: ", err);
}

// //Get the default connection
const db = mongoose.connection;

// // Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// routes
app.use(express.static("public"));
app.use("/", home);
app.use("/auth", auth);
app.use("/api", api);
app.use("/student", student);
app.use((req, res, next) => {
  if (req.user.role === "student") {
    const err = {
      status: 403,
      message: "You are forbidden to view this page.",
    };
    next(err);
  } else {
    next();
  }
});
app.use("/teacher", teacher);
app.use("*", (req, res, next) => {
  next({ status: 404, message: "Page not found" }, req, res, next);
});
app.use(function (err, req, res, next) {
  if (!err.status) {
    err.status = 500;
  }
  console.error(err);
  return res.status(err.status).send(Error(err));
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
