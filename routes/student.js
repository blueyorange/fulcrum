import { Router } from "express";
import Student from "../views/Student.js";
import Question from "../models/Question.js";

const router = new Router();

router.get("/", async (req, res, next) => {
  //  use { $match: { a: 10 } } for filtering
  try {
    const result = await Question.aggregate([{ $sample: { size: 1 } }]);
    console.log("response", result[0]);
    if (result) {
      const question = result[0];
      const { user } = req;
      return res.send(Student({ user, question }));
    }
  } catch (err) {
    next(err);
  }
});

export default router;
