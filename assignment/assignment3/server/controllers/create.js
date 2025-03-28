const { validationResult } = require('express-validator');
const productService = require('../services/productService'); // Your product service
const { BadRequest } = require('../middlewares/errorHandler'); // Your error handler

// Create a product
module.exports = async (req, res, next) => {
  // Validate the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequest('Validation failed', errors.array())); // Pass validation errors
  }

  try {
    // Destructure the necessary fields from req.body
    const { name, price, stock, description, user, imageUrl } = req.body;

    // Prepare the product data (optional: you can modify the structure here)
    const productData = { name, price, stock, description: description || '', user, imageUrl };

    // Create a new product using the productService
    const product = await productService.create(productData);

    // Respond with the newly created product
    res.status(201).json(product);
  } catch (err) {
    // Handle any errors during the creation process
    next(err);
  }
};
