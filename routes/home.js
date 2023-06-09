import { Router } from "express";
const router = Router();
import Home from "../views/Home.js";

router.get("/", (req, res) => {
  return res.send(Home({ user: req.user }));
});

router.get("/sync");

export default router;
