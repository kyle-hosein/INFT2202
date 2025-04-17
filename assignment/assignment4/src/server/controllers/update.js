const { validationResult } = require('express-validator');
const productService = require('../services/productService');
const { BadRequest, NotFound } = require('../middlewares/errorHandler');

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new BadRequest('Validation failed', errors.array()));
  }

  try {
    const product = await productService.update(req.params.product_id, req.body);
    if (!product) return next(new NotFound('Product not found'));
    return res.json(product);
  } catch (err) {
    next(err);
  }
};
