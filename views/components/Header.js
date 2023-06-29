const navItems = [
  { path: "/teacher/questions", title: "Questions" },
  { path: "/teacher/students", title: "Students" },
];

const Header = (user) => `
  <nav class="navbar">
    <h1>Fulcrum</h1>
    <ul class="nav-items">
      ${navItems
        .map(
          (item) =>
            `<li class="nav-item"><a href="${item.path}">${item.title}</a></li>`
        )
        .join("")}
      ${
        user
          ? `<li class="nav-item" id="logout"><a href="/auth/logout">Log Out</a></li>`
          : ""
      }
    </ul>
  </nav>`;

export default Header;
