import Base from "./Base.js";

function courseTable(course) {
  return `<h3>${course.name}</h3>
  <table>
    <tr><th><h4>Name</h4></th></tr>
    ${course.students
      .map((student) => `<tr><td>${student.name} ${student.surname}</td></tr>`)
      .join("")}
  </table>`;
}

const Teacher = ({ courses, user }) => {
  if (!Array.isArray(courses)) {
    courses = [];
  }
  return Base(
    { title: "Teacher" },
    `
    <header>
        <h1>Welcome to Fulcrum, ${user.name}!</h1>
      </header>
      <main>
        <h2>Courses</h2>
        <p>You have ${courses.length} courses.</p>
        ${courses.map(courseTable).join("")}
      </main>
      `
  );
};

export default Teacher;
