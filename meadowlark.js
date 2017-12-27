const express = require('express');
const app = express();
const fortune = require('./lib/fortune.js');

// set up handlebars view engine
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('layouts/home');
});

app.get('/about', (req, res) => {
    res.render('layouts/about', { fortune: fortune.getFortune() });
});

// Custom 404
app.use( (req, res) => {
    res.status(404);
    res.render('layouts/404');
});

// Custom 505
app.use( (err, req, res, next) => {
    console.log(err.stack);
    res.status(500);
    res.render('layouts/500');
});

// Start Server
app.listen(app.get('port'), () => {
    console.log('Express Started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate.');
});