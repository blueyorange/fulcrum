import Base from "./Base.js";

const option = (opt) => `
  <input type="radio" name="answer" id="answer-${opt}" value="${opt}" required>
  <label for="answer-${opt}">${opt}</label>
  `;

const Student = ({ user, question }) => {
  return Base(
    { title: "Student" },
    `<header>
        <h1>Welcome to Fulcrum, ${user.name}!</h1>
      </header>
      <main>
        <img src="${question.image}"/>
        <form action="/student/submit" type='get'>
          <input type='hidden' value="${question._id}" name='_id'>
          ${["A", "B", "C", "D"].map(option).join("")}
          <button type="submit">Submit</button>
        </form>
      </main>
      `
  );
};

export default Student;
