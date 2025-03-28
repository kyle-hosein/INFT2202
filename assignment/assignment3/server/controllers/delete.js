const productService = require('../services/productService');
const { NotFound } = require('../middlewares/errorHandler');

module.exports = async (req, res, next) => {
  try {
    const deleted = await productService.delete(req.params.product_id);
    if (!deleted) return next(new NotFound('Product not found'));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
