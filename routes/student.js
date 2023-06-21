import { Router } from "express";
import Student from "../views/Student.js";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

const router = new Router();

router.get("/", async (req, res, next) => {
  //  use { $match: { a: 10 } } for filtering
  try {
    const result = await Question.aggregate([{ $sample: { size: 1 } }]);
    if (result) {
      const question = result[0];
      const { user } = req;
      return res.send(Student({ user, question }));
    }
  } catch (err) {
    next(err);
  }
});

router.get("/submit", async (req, res, next) => {
  const { _id, answer } = req.query;
  const question = await Question.findById(_id);
  const ans = await Answer.create({
    question,
    answer,
    student: req.user._id,
    isCorrect: answer === question.correct,
  });
  return res.redirect("/");
});

export default router;
