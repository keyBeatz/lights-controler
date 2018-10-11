const fallback = require('express-history-api-fallback');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;

const root = path.resolve(__dirname, './dist');
const static = path.resolve(__dirname, './dist/static');

app.use('/static', express.static(static));
app.use(fallback('index.html', { root }));

http.listen(port, function() {

});
