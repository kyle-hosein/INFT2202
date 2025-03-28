const productService = require('../services/productService');
const { NotFound } = require('../middlewares/errorHandler');

module.exports = async (req, res, next) => {
  try {
    const product = await productService.retrieve(req.params.product_id);
    if (!product) return next(new NotFound('Product not found'));
    res.json(product);
  } catch (err) {
    next(err);
  }
};
