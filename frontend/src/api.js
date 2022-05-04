import config from './config.json'

const axios = require('axios');

const instance = axios.create({
  baseURL: `http://${config.server_host}:${config.server_port}/`,
  timeout: 30000
});
export default instance;