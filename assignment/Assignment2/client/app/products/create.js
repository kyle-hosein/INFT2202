/*
 
*/

// Filename: create.js
// Description: Handles product creation and validation

import { ProductService } from "./product.service.js";
import { Product } from "./product.js";

const productService = new ProductService();
const form = document.getElementById("product-form");
const submitButton = document.getElementById("submit-btn");
const formTitle = document.getElementById("form-title");

const urlParams = new URLSearchParams(window.location.search);
const editProductName = urlParams.get("edit");
console.log(editProductName)

if (editProductName) {
    loadProductForEditing(editProductName);
}

// Function to load product details into form for editing
async function loadProductForEditing(productName) {
    const product = await productService.getProductByName(productName);
    console.log(product)
    if (product) {
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("stock").value = product.stock;
        document.getElementById("description").value = product.description;

        formTitle.textContent = "Edit Product";
        submitButton.textContent = "Update Product";
    }
}

// Function to validate the form inputs
function validateForm() {
    let isValid = true;
    form.querySelectorAll("input, textarea").forEach(field => {
        if (!field.value.trim()) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
            isValid = false;
        } else {
            field.classList.remove("is-invalid");
            field.classList.add("is-valid");
        }
    });
    return isValid;
}

// Function to handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("Form submitted!");

    if (!validateForm()) {
        console.log("Validation failed.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const price = parseFloat(document.getElementById("price").value).toFixed(2);
    const stock = parseInt(document.getElementById("stock").value, 10);
    const description = document.getElementById("description").value.trim();

    if (editProductName) {
        // Update existing product
        const updatedProduct = new Product(name, price, stock, description);
        productService.updateProduct(editProductName, updatedProduct);
        console.log("Product updated:", updatedProduct);
    } else {
        // Create a new product
        const newProduct = new Product(name, price, stock, description);
        console.log(newProduct.getObject())
        productService.addProduct(newProduct.getObject());
        console.log("New product added:", newProduct);
    }
    form.reset();
        form.querySelectorAll("input, textarea").forEach(field => {
            field.classList.remove("is-valid", "is-invalid"); // Remove validation styles
        });

    window.location.href = "search.html";
});