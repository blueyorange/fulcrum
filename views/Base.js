const scriptHTML = (file) =>
  `<script src="/js/${file}.js" type="module"></script>`;

export default ({ scripts = [], title = "" }, children = "") =>
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
        <link rel="stylesheet" href="/css/styles.css">
        <title>Fulcrum - ${title}</title>
      </head>
      <body>
        ${children}
      </body>
    </html> `;
