const { body, validationResult } = require('express-validator');  // Importing validation functions directly
const ConflictError = require('../../errors/ConflictError'); // Custom ConflictError handler

// Validation middleware to handle errors
function doValidation(request, response, next) {
  const result = validationResult(request);  // Check for validation errors
  if (!result.isEmpty()) {
    // If errors are found, pass them to the error handler
    const errObj = { errors: result.array() };
    return next(new ConflictError('Input Validation Failed', errObj));
  }
  return next();  // Proceed if validation is successful
}

// Define validation rules for creating a product
const validateCreate = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('description').optional().isString().withMessage('Description must be a string'),
  doValidation  // Adding the validation step at the end
];

// Define validation rules for updating a product
const validateUpdate = [
  body('name').optional().notEmpty().withMessage('Name must not be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a non-negative number'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('description').optional().isString().withMessage('Description must be a string'),
  doValidation  // Adding the validation step at the end
];

module.exports = { validateCreate, validateUpdate };
