require('dotenv').config();

// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http(req) {
  console.log('env', process.env.REDIRECT);
  const url = `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${process.env.CLIENTID}&redirect_uri=${process.env.REDIRECT}&state=1231231&scope=account:write%20trading`;
  return {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .max-width-320 {
      max-width: 20rem;
    }
    .margin-left-8 {
      margin-left: 0.5rem;
    }
    .margin-bottom-16 {
      margin-bottom: 1rem;
    }
    .margin-bottom-8 {
      margin-bottom: 0.5rem;
    }
    .padding-32 {
      padding: 2rem;
    }
    .color-grey {
      color: #333;
    }
    .color-black-link:hover {
      color: black;
    }
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <div class="margin-left-8">
      <div class="margin-bottom-16">
        <h1 class="margin-bottom-16">
          Hello from Alpaca!
        </h1>
      </div>
      <div>
        <p class="margin-bottom-8">
          You can authorize here:
        </p>
        <code>
          <a class="color-grey color-black-link" href="${url}">Authorize Here</a>
        </code>
      </div>
    </div>
  </div>
</body>
</html>
`
  };
};
