const movies = require('../data/movies.json');

module.exports = (req, res) => {
  const { genre, title } = req.query;

  let results = movies;

  if (genre) {
    results = results.filter(m => m.genre.toLowerCase() === genre.toLowerCase());
  }

  if (title) {
    results = results.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
  }

  res.json(results);
};
