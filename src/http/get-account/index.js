const Alpaca = require('@alpacahq/alpaca-trade-api');
require('dotenv').config();

exports.handler = async function http(req) {
  const alpaca = new Alpaca({
    // this is temporary will really come from the DB for each user
    oauth: process.env.OAUTH,
    paper: true,
    usePolygon: false
  });
  const account = await alpaca.getAccount();
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
  <title>Account Details</title>
  <style>
  body {
    padding: 3rem;
    font-size: 16px;
  }
  
  textarea {
    width: 100%;
    min-height: 30rem;
    font-family: "Lucida Console", Monaco, monospace;
    font-size: 0.8rem;
    line-height: 1.2;
  }
  </style>
</head>
<textarea name="" id="myTextarea" cols="30" rows="10">${JSON.stringify(
      account,
      undefined,
      4
    )}</textarea>
</html>
`
  };
};
