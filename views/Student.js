import Base from "./Base.js";

const Student = ({ user, question }) => {
  return Base(
    { title: "Student" },
    `<header>
        <h1>Welcome to Fulcrum, ${user.name}!</h1>
      </header>
      <main>
        <img src="${question.image}"/>
  </main>
      `
  );
};

export default Student;
