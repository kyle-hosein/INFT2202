const Product = require('../models/Product');

class ProductService {
  async create(data) {
    const product = new Product(data);
    return await product.save();
  }

  async retrieve(productId) {
    return await Product.findById(productId);
  }

  async update(productId, updates) {
    return await Product.findByIdAndUpdate(productId, updates, {
      new: true,
      runValidators: true
    });
  }

  async delete(productId) {
    const result = await Product.findByIdAndDelete(productId);
    return !!result;
  }

  async search(query = {}) {
    const filter = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }

    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = Number(query.minPrice);
      if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
    }

    return await Product.find(filter);
  }
}

module.exports = new ProductService(); 
