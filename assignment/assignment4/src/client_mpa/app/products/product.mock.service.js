/*

*/

// File: src/client/app/products/product.mock.service.js
// Author: Kyle Hosein
/// Date: 17/04/2025
// Course: INFT 2202
// Description: Provides a mock service for managing product data.

import { Product } from "./products/Product.js";

class ProductServiceMock {
    constructor() {
        this.storageKey = "products";
        this.products = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.products));
    }

    getAllProducts() {
        return this.products;
    }

    getProductByName(name) {
        return this.products.find(product => product.name.toLowerCase() === name.toLowerCase()) || null;
    }

    addProduct(product) {
        if (product instanceof Product) {
            this.products.push(product);
            this.saveToStorage();
            return true;
        }
        return false;
    }

    updateProduct(name, updatedProduct) {
        const index = this.products.findIndex(product => product.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            this.products[index] = updatedProduct;
            this.saveToStorage();
            return true;
        }
        return false;
    }

    deleteProduct(name) {
        const index = this.products.findIndex(product => product.name.toLowerCase() === name.toLowerCase());
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }
}

export { ProductServiceMock };
