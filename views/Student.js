import Base from "./Base.js";

const optionButton = (opt) => `
  <div class="button">
    <input type="radio" name="answer" id="answer-${opt}" value="${opt}" required>
    <label for="answer-${opt}">${opt}</label>
  </div>
  `;

const Student = ({ user, question }) => {
  return Base(
    { title: "Student", scripts: ["question"] },
    `
    <header>
        <h1>Welcome to Fulcrum, ${user.name}!</h1>
      </header>
      <main class="question-container">
        <img src="${question.image}"/>
          <form name="answer" id="answer-form">
          <input type='hidden' value="${question._id}" name='_id'>
          <div class='options-group'>
            ${["A", "B", "C", "D"].map(optionButton).join("")}
            <button class="button" type="submit" name="submit" class="button">Submit</button>
          </div>
        </form>
      </main>
      `
  );
};

export default Student;
