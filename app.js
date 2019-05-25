// taken from https://medium.com/@ianposton2/create-react-app-deploy-to-heroku-7c3c03f34382
// needed for heroku hosting

const express = require('express');
const http = require('http');
const path = require('path');
let app = express();
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || '8080';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
