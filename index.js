'use strict';
const express = require('express'),
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

const port = process.env.PORT || 3001;

app.use(( req, res, next ) => {
  // some middleware
  next();
});

app.get('/', ( req, res ) => {
  res.render('index.html');
});

// API ROUTES ------------------------------------------------------------------

const routes = express.Router();

routes.get('/', ( req, res ) => {
    res.json({ msg: "Welcome to the Palindrome API!" });
});

routes.route('/palindromes')
  .get(( req, res ) => {
    if (req.query.q)
      res.send(req.query.q);
    res.status(400).json({ error: "You must enter at least one palindrome" })
  });

routes.route('/palindromes/:palindrome')
  .get(( req, res ) => {
    res.send(req.params.palindrome);
  });

app.use('/api', routes);

app.listen(port, () => {
    console.log('app listening in', port);
});
