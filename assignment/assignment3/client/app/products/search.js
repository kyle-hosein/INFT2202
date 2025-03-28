/*
    
*/

// Filename: search.js
// Description: Handles product listing and search

import { ProductService } from "./product.service.js";

const productService = new ProductService();
const productContainer = document.getElementById("product-container");
const paginationContainer = document.getElementById("pagination");
const perPageSelect = document.getElementById("perPageSelect");
const spinner = document.getElementById("spinner");
const messageBox = document.getElementById("message");

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get("page")) || 1;
let perPage = parseInt(urlParams.get("perPage")) || 6;
let products = []; // Store products globally

async function displayProducts() {
    try {
        showSpinner();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        products = await productService.getAllProducts();
        hideSpinner();

        if (!products.length) {
            showMessage("The shop is currently closed.", "warning");
            return;
        }

        updatePagination(products.length);
        renderProducts();
    } catch (error) {
        hideSpinner();
        showMessage("Error loading products. Try again later.", "danger");
    }
}

function renderProducts() {
    productContainer.innerHTML = "";

    const start = (currentPage - 1) * perPage;
    const paginatedProducts = products.slice(start, start + perPage);

    paginatedProducts.forEach(product => {
        const isOwner = product.user === "Kyle Hosein"; // Change to actual user logic

        const productCard = document.createElement("div");
        productCard.classList.add("col-md-4", "mb-4");

        productCard.innerHTML = `
            <div class="card h-100 shadow">
                <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>Price:</strong> $${product.price}</p>
                    <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
                    <p class="card-text"><strong>Listed By:</strong> ${product.user}</p>
                    <p class="card-text"><strong>Listed At:</strong> ${new Date(product.listedAt * 1000).toLocaleString()}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary">Add to Cart</button>
                        ${product.user === "100720682" ? `
                        <button class="btn btn-warning edit-btn" data-id="${product.name}"><i class="bi bi-pencil-square"></i> Edit</button>
                        <button class="btn btn-danger delete-btn" data-id="${product.name}" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="bi bi-trash"></i> Delete</button>` : ""}
                    </div>
                </div>
            </div>
        `;

        productContainer.appendChild(productCard);
    });

    attachEventListeners(); // Attach event listeners for edit & delete
}

function attachEventListeners() {
    // Attach Edit Event
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.currentTarget.getAttribute("data-id");
            console.log(productId)
            window.location.href = `create.html?edit=${productId}`;
        });
    });

    // Attach Delete Event
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = e.currentTarget.getAttribute("data-id");
            document.getElementById("confirmDelete").setAttribute("data-id", productId);
        });
    });
}

// Handle Delete Confirmation
document.getElementById("confirmDelete").addEventListener("click", async () => {
    const productId = document.getElementById("confirmDelete").getAttribute("data-id");
    await deleteProduct(productId);
});

async function deleteProduct(id) {
    try {
        await productService.deleteProduct(id);
        displayProducts();
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById("deleteModal"));
        deleteModal.hide(); // Refresh products after delete
    } catch (error) {
        showMessage("Error deleting product. Try again.", "danger");
    }
}

function updatePagination(totalProducts) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalProducts / perPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item", i === currentPage ? "active" : "");
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(pageItem);
    }
}

function changePage(page) {
    currentPage = page;
    updateURL();
    renderProducts();
}

function updateURL() {
    const newParams = new URLSearchParams({ page: currentPage, perPage });
    window.history.replaceState({}, "", `?${newParams.toString()}`);
}

function showSpinner() {
    spinner.classList.remove("d-none");
}

function hideSpinner() {
    spinner.classList.add("d-none");
}

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `alert alert-${type} text-center`;
    messageBox.classList.remove("d-none");
}

perPageSelect.addEventListener("change", () => {
    perPage = parseInt(perPageSelect.value);
    updateURL();
    displayProducts();
});

displayProducts();