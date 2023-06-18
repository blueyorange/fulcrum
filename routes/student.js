import { Router } from "express";

const router = new Router();

router.get("/", (req, res) => {
  const { user } = req;
  return res.send(`<h1>Welcome ${user.name}</h1>`);
});

export default router;
