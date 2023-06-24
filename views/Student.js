import Base from "./Base.js";

const option = (opt) => `
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
      <main class="question">
        <img src="${question.image}"/>
        <form action="/student/submit" type='get' name="answer">
          <input type='hidden' value="${question._id}" name='_id'>
          <div class='options-group'>
            ${["A", "B", "C", "D"].map(option).join("")}
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
      `
  );
};

export default Student;
