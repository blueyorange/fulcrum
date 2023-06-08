import Base from "./Base.js";
import Header from "./components/header.js";

const title = "Error";

const Error = (err) =>
  Base(
    { title },
    `
    <h1>Error: ${err.status}</h1>
    <pre>${err.message}</pre>
`
  );

export default Error;
