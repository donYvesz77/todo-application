var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./server/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.all('/*', function(req,res){
 res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, function () {
	/* body... */
	console.log('Server running at '+ PORT);
})