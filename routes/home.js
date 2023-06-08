import { Router } from "express";
const router = Router();
import home from "../views/Home.js";

router.get("/", (req, res) => {
  const { user } = req;
  console.log(user);
  return res.send(home({ user }));
});

export default router;
