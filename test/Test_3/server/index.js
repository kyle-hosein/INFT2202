const express = require('express');
const app = express();
const moviesRouter = require('./routes/movies');
require('dotenv').config();
const cors = require('cors');



const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // allow all origins by default
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/movies', moviesRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
