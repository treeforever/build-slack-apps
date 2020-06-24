const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./action.js');

// Initialize an Express application
// NOTE: You must use a body parser for the urlencoded format before attaching the adapter
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Select a port for the server to listen on.
// NOTE: When using ngrok or localtunnel locally, choose the same port it was started with.
const port = process.env.PORT || 3000;

// Start the express application server
http.createServer(app).listen(port, () => {
    console.log(`server listening on port ${port}`);
});

app.post('/slack/actions', handler.interestHandler);
