import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  switch (req.user.role) {
    case "teacher":
      return res.redirect("/teacher");
    default:
      return res.redirect("/student");
  }
});

export default router;
