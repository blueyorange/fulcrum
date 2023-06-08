import html from "../../tags/html.js";
import base from "../base.js";
import googleOneTap from "../components/googleOneTap.js";
import header from "../components/header.js";

export default ({ user }) => {
  const title = "Home";
  const body = html`${header({ title })}
    <main></main>
    ${user ? googleOneTap : ``}`;
  return base({ title, body });
};
