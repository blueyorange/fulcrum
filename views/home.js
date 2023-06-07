import { html } from "lit-html";

export default () => {
  html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div
          id="g_id_onload"
          data-client_id="process."
          data-login_uri="https://your.domain/your_login_endpoint"
          data-your_own_param_1_to_login="any_value"
          data-your_own_param_2_to_login="any_value"
        ></div>
      </body>
    </html>
  `;
};
