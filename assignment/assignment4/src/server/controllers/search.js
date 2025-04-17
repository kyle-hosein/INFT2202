const productService = require('../services/productService');

module.exports = async (req, res, next) => {
  try {
    const products = await productService.search(req.query);
    res.json(products);
  } catch (err) {
    next(err);
  }
};
