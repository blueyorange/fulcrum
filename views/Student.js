import Base from "Base.js";

const Student = () => {
  return Base(
    { title: "Student" },
    `<header>
        <h1>Welcome to Fulcrum, student!</h1>
      </header>`
  );
};

export default Student;
