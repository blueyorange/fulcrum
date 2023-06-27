import fs from "fs";

const tagMap = {
  misc: null,
  "Length & Time": "Forces",
  Motion: "Forces",
  "Mass and weight": "Forces",
  Density: "Particle Model",
  "Energy, work and power": "Energy",
  Pressure: "Forces",
  "Thermal Properties and Temperature": "Particle Model",
  "General wave properties": "Waves",
  Light: "Waves",
  Sound: "Waves",
  "Electrical quantities": "Electricity",
  "Electric circuits": "Electricity",
  Magnetism: "Magnetism",
  "Simple kinetic molecular model of matter": "Particle Model",
  "The nuclear atom": "Atomic Structure",
  "Turning effects": "Forces",
  "Effects of forces": "Forces",
  "Thermal processes": "Energy",
  "Electromagnetic effects": "Magnetism",
  "Electromagnetic Spectrum": "Waves",
  "Dangers of electricity": "Electricity",
  Radioactivity: "Atomic Structure",
  "Scalars and vectors": "Forces",
  "Digital electronics": "Electronics",
};

fs.readFile("./questions.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Parse the JSON data
    const questions = JSON.parse(data).questions;

    // map questions with tags to questions with categories
    const newQuestions = questions.map((question) => {
      const newTags = [];
      question.tags.forEach((tag) => {
        const newTag = tagMap[tag];
        if (newTag) {
          newTags.push(newTag);
        }
      });
      const match = /\!\[(.*?)\]/.exec(question.body);
      const text = match ? match[1] : "";
      return {
        image: question.images[0],
        correct: question.correct[0],
        text,
      };
    });
    fs.writeFileSync(
      "./questions2.json",
      JSON.stringify(newQuestions),
      {
        encoding: "utf-8",
      },
      (err) => {
        console.log(err);
      }
    );
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
