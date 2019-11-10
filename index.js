const http = require('http');
const config = require(`./config.json`);
const app = require(`./app`);
const { setupMailer } = require('./libs/email');
require('./libs/passport');

global.__approot = __dirname;

const server = http.createServer(app);
const port = process.env.PORT || config.server.port;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});