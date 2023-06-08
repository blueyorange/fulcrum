import html from "../tags/html.js";

export default ({ title, body }) =>
  html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        <title>Fulcrum - ${title}</title>
      </head>
      <body>
        ${body}
      </body>
    </html> `;
