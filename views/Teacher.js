import Base from "./Base.js";

const Student = () => {
  return Base(
    { title: "Teacher" },
    `<header>
        <h1>Welcome to Fulcrum, teacher!</h1>
      </header>`
  );
};

export default Student;
