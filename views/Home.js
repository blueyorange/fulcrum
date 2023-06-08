import Base from "./Base.js";
import Header from "./components/header.js";

const title = "Home";

const Home = (props) =>
  Base(
    { title },
    `
    ${
      !props.user
        ? `<div
  id="g_id_onload"
  data-client_id="${process.env.GOOGLE_CLIENT_ID}"
  data-login_uri="${process.env.ONE_TAP_URI}"
></div>`
        : ``
    }
${Header({ ...props, title })}
`
  );

export default Home;
