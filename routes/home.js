import { Router } from "express";
const router = Router();
import home from "../views/home.js";

router.get("/", (req, res) => {
  console.log("Home ", req.user);
  return res.send(home({ user: req.user, title: "Home" }));
});

export default router;
