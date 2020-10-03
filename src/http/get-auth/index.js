const qs = require('qs');
const axios = require('axios');
require('dotenv').config();
// learn more about HTTP functions here: https://arc.codes/primitives/http
exports.handler = async function http(req) {
  const { queryStringParameters } = req;
  const { code } = queryStringParameters;

  var data = qs.stringify({
    grant_type: 'authorization_code',
    code: code,
    client_id: process.env.CLIENTID,
    client_secret: process.env.CLIENTSECRET,
    redirect_uri: 'http://localhost:3333/auth'
  });
  var config = {
    method: 'post',
    url: 'https://api.alpaca.markets/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: data
  };
  const url = `https://api.alpaca.markets/oauth/token`;
  console.log({ url, code, queryStringParameters });
  const res = await axios(config);
  console.log({ res });
  const { status } = res;
  return {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body:
      status === 200
        ? 'Congratulations you are authorized!'
        : 'Sorry an error occured'
  };
};
