import Base from "./Base.js";

function arrayToHtmlTable(array) {
  let html = "<table>";

  if (array.length > 0) {
    // Generate the table headers from the first object
    html += "<tr>";
    Object.keys(array[0]).forEach((key) => {
      html += `<th>${key}</th>`;
    });
    html += "</tr>";

    // Generate the table rows from each object in the array
    array.forEach((obj) => {
      html += "<tr>";
      Object.values(obj).forEach((value) => {
        html += `<td>${value}</td>`;
      });
      html += "</tr>";
    });
  }

  html += "</table>";

  return html;
}

const Teacher = ({ courses }) => {
  return Base(
    { title: "Teacher" },
    `
    <header>
        <h1>Welcome to Fulcrum, teacher!</h1>
      </header>
      <main>
        <h2>Courses</h2>
        ${arrayToHtmlTable(courses)}
  </main>
      `
  );
};

export default Teacher;
