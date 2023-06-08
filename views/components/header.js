const navItems = [];

const SiteNav = (props) => `
<header>
  <h1>Fulcrum</h1>
  <nav>
    <ul>
      ${navItems.map(
        (item) => `<li><a href="${item.path}">${item.title}</a></li>`
      )}
      ${props.user ? `<li><a href="/auth/logout">Log Out</a></li>` : ""}
    </ul>
  </nav>
</header>`;

export default SiteNav;
