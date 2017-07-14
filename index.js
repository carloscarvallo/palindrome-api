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

let reverse = function( str ) {
  return str.split("").reverse().join("");
};

let format = function( str ) {
  return str.split(" ").join("");
};

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
    if (req.query.q) {
      var formatted = format(req.query.q);
      var reversed = reverse(formatted);
      if (reversed == format(req.query.q)) {
        console.log("reversed:", reversed);
        console.log("original:", req.query.q);
        res.json({ message: "IS A PALINDROME" });
      } else {
        res.status(400).json({ message: "IS NOT A PALINDROME" });
      }
    } else
    res.status(400).json({ error: "You must enter at least one palindrome" })
  });

routes.route('/palindromes/:palindrome')
  .get(( req, res ) => {
    if (req.params.palindrome)
      res.send(req.params.palindrome);
    res.status(400).json({ error: "You must enter at least one palindrome" })
  });

app.use('/api', routes);

app.listen(port, () => {
    console.log('app listening in', port);
});
