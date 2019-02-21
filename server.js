'use strict';
const express = require('express');
const morgan = require('morgan');
const movies = require('./movies');

const app = express();

app.use(morgan('dev'));

const PORT = 8000;

app.get('/movie', (req,res) => {
  const query = req.query; 
  const genre= query.genre;
  const country= query.country;
  const avg_vote= parseInt(query.avg_vote, 10);
  let results = [];

  if(genre){
    results = movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  if(country){
    results = movies.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()));
  }

  if(avg_vote){
    results = movies.filter(movie => movie.avg_vote >= avg_vote);
  }
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
