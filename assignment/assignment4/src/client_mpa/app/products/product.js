/*
    
*/


// File: src/client/app/products/Product.js
// Author: Kyle Hosein


function Product(name, price, stock, description, imageUrl, owner = "100720682") {
    this.name = name;
    this.price = parseFloat(price); // Ensure price is formatted
    this.stock = parseInt(stock, 10);
    this.description = description;
    this.imageUrl = imageUrl || "default-product.jpg"; // Default image if none provided
    this.user = owner; // Optional field for ownership tracking
}

// Method to display product details
Product.prototype.getDetails = function () {
    return `${this.name} - $${this.price} (${this.stock} in stock) - user: ${this.user}`;
};

// Method to check stock availability
Product.prototype.isAvailable = function () {
    return this.stock > 0;
};

// Method to update stock quantity
Product.prototype.updateStock = function (amount) {
    this.stock += amount;
};

Product.prototype.getObject = function(){
    return {"name": this.name,
        "description": this.description,
        "stock": this.stock,
        "price": this.price,
        "user": this.user,
        "imageUrl": this.imageUrl
    }
}

// Export Product function for modular JavaScript usage
export { Product };

