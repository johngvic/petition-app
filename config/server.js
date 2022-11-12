const express = require('express');
const body_parser = require('body-parser')

let app = express();
let port = process.env.PORT || 5080;

app.set('views', './app/views');
app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(body_parser.urlencoded({ extended:true }));

app.listen(port, function () {
	console.log('Running on', port);
});

module.exports = app;