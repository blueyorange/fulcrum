import { Router } from "express";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

const router = Router();

router.post("/answer", async (req, res, next) => {
  const { _id, answer } = req.body;
  let question;
  try {
    question = await Question.findById(_id);
  } catch (err) {
    err.message("Error finding question upon answer submission.");
    return next(err);
  }
  if (question) {
    const ans = await Answer.create({
      question,
      answer,
      student: req.user._id,
      isCorrect: answer === question.correct,
    });
    return res.json(ans);
  } else {
    throw new Error({ code: 500, message: "Not found." });
  }
});

export default router;
