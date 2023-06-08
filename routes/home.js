import { Router } from "express";
const router = Router();
import Home from "../views/Home.js";

router.get("/", (req, res) => {
  return res.send(Home({ user: req.user }));
});

export default router;
