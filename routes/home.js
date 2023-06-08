import { Router } from "express";
const router = Router();
import home from "../views/pages/home.js";

router.get("/", (req, res) => {
  const { user } = req;
  return res.send(home({ user }));
});

export default router;
