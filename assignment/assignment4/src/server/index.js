const express = require('express');
const app = express();
const morgan = require('morgan');
const winston = require('./middlewares/logger');
const { errorHandler, NotFound } = require('./middlewares/errorHandler');
const productsRouter = require('./routes/products');
const path = require('path');
const connectDB = require('./config/mongo');
require('dotenv').config();
const cors = require('cors');



const PORT = process.env.PORT || 4000;

connectDB();

// Middleware
app.use(cors()); // allow all origins by default
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../../dist')));
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(morgan('combined', { stream: winston.stream }));

// Use EJS as the view engine
app.set('view engine', 'ejs');

// Tell Express where to find .ejs files
app.set('views', path.join(__dirname, '../client/app'));

// Route to serve header.ejs
app.get('/header', (req, res) => {
  res.render('components/header/header');  // This renders header.ejs
});

// Route to serve footer.ejs
app.get('/footer', (req, res) => {
  res.render('components/footer/footer');  // This renders footer.ejs
});

// Routes
app.use('/api/products', productsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

// 404 handler
app.use((req, res, next) => {
  next(new NotFound('Route not found'));
});

// Error handler
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
