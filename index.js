'use strict';
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      cors = require('cors');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

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
  res.send("Welcome");
});

// API ROUTES ------------------------------------------------------------------

const routes = express.Router();

routes.get('/', ( req, res ) => {
    res.json({ msg: "Welcome to the Palindrome API!" });
});

routes.route('/palindromes')
  .get(( req, res ) => {
    var word = req.query.q;
    if (word) {
      var formatted = format(word);
      var reversed = reverse(formatted);
      if (reversed == format(word)) {
        console.log("reversed:", reversed);
        console.log("original:", word);
        res.json({ message: "IS A PALINDROME" });
      } else {
        res.status(400).json({ message: "IS NOT A PALINDROME" });
      }
    } else
    res.status(400).json({ error: "You must enter at least one palindrome" })
  });

routes.route('/palindromes/:palindrome')
  .get(( req, res ) => {
    var word = req.params.palindrome;
    if (word) {
      var formatted = format(word);
      var reversed = reverse(formatted);
      if (reversed == format(word)) {
        console.log("reversed:", reversed);
        console.log("original:", word);
        res.json({ message: "IS A PALINDROME" });
      } else {
        res.status(400).json({ message: "IS NOT A PALINDROME" });
      }
    } else
    res.status(400).json({ error: "You must enter at least one palindrome" })
  });

app.use('/api', routes);

app.listen(port, () => {
    console.log('app listening in', port);
});
