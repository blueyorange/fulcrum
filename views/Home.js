import Base from "./Base.js";
import Header from "./components/header.js";

const title = "Home";

const Home = (props) =>
  Base(
    { title },
    `
<header>
  ${Header({ ...props, title })}
</header>
<main>
<a href="/auth/google">Sign in with Google</a>
`
  );

export default Home;
