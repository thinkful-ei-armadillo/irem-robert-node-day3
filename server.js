'use strict';
const express = require('express');
const morgan = require('morgan');
const movies = require('./movies');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config(); 
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== process.env.API_TOKEN) {
    return res.status(401).json({error: 'Unauthorized'})
  }

  next();
})

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
