// File: src/client/app/product.service.js
// Author: Kyle Hosein
// Date: 2025-04-16
// Course: INFT 2202
// Description: ProductService that communicates with an API.

class ProductService {
    constructor() {
        this.host = "/api/products/";
    }

    async getAllProducts() {
        try {
            const response = await fetch(this.host);
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const response = await fetch(`${this.host}/${id}`);
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error(`Error fetching product "${id}":`, error);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            const response = await fetch(this.host, {
                method: "POST",
                body: JSON.stringify(product),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const response = await fetch(`${this.host}/${id}`, {
                method: "PUT",
                body: JSON.stringify(updatedProduct),
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error(`Error updating product "${id}":`, error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            await fetch(`${this.host}/${id}`, { method: "DELETE" });
        } catch (error) {
            console.error(`Error deleting product "${id}":`, error);
            throw error;
        }
    }
}

export { ProductService };
