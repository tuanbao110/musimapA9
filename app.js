
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var artistscreen = require('./routes/artistscreen');
var help = require('./routes/help');
var index = require('./routes/index');
var library = require('./routes/library');
var likeThis = require('./routes/likeThis');
var menu = require('./routes/menu');
var results = require('./routes/results');
var login = require('./routes/login');
var map = require('./routes/map');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/artistscreen', artistscreen.view);
app.get('/artistscreen/:name', artistscreen.viewName);
app.get('/help', help.view);
app.get('/', login.view);
app.get('/index', index.view);
app.get('/likeThis/:name', likeThis.viewFromArtist);
app.get('/menu', menu.view);
app.get('/results', results.view);
app.get('/add/:name', library.addArtist);
app.get('/add', library.addArtist);
app.get('/addAlt', library.addAlt);
app.get('/addAlt/:name', library.addAlt);
app.get('/map', map.view);

var hbs = require('handlebars');
hbs.registerHelper('eachRow', function (items, numColumns, options) {
    var result = '';

    for (var i = 0; i < items.length; i += numColumns) {
        result += options.fn({
            columns: items.slice(i, i + numColumns)
        });
    }

    return result;
});

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
