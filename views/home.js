export default ({ title, user }) =>
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
        <title>Fulcrum - ${title}</title>
      </head>
      <body>
        ${
          user
            ? `<p>Hi ${user.displayName}</p>`
            : `
            <div
          id="g_id_onload"
          data-client_id="${process.env.GOOGLE_CLIENT_ID}"
          data-login_uri="${process.env.ONE_TAP_URI}"
        ></div>`
        }
      </body>
    </html>
  `;
