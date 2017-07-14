'use strict';
const request = require('request'),
      express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      nunjucks = require('nunjucks');

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// template initialization
nunjucks.configure('assets', {
    autoescape: true,
    noCache: true,
    express: app
});

const port = process.env.PORT || 8080;

app.use(( req, res, next ) => {
  // some middleware
});

app.get('/', ( req, res ) => {
  res.render('index.html');
});

// API ROUTES ------------------------------------------------------------------

const routes = express.Router();

routes.get('/', ( req, res ) => {
    res.json({ msg: "Welcome to the API!" });
});

routes.route('/test')
    .get(( req, res ) => {
      res.json({ msg: "I am users" });
    });

app.use('/api', routes);

app.listen(port, () => {
    console.log('app listening in', port);
});
