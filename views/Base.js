const scriptHTML = (file) =>
  `<script src="/public/js/${file}.js" type="module">`;

export default (props, children = "", scripts = []) =>
  `<!DOCTYPE html>
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
        ${scripts.map(scriptHTML).join("")}
        <title>Fulcrum - ${props.title}</title>
      </head>
      <body>
        ${children}
      </body>
    </html> `;
