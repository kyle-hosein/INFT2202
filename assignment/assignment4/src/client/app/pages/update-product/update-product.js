import { render } from "../../lib/render.js";
import view from "./update-product.ejs";
import { ProductService } from "../../product.service.js";

const productService = new ProductService();

export default async function updateProduct(params) {
    const productId = params?.id;
    const app = document.getElementById("content");

    try {
        const product = await productService.getProductById(productId);
        if (!product) throw new Error("Product not found");

        // Render HTML using EJS view
        const html = await render(view, { product });
        app.innerHTML = html;

        const form = document.getElementById("product-form");

        if (!form) {
            console.error("Form not found in rendered HTML.");
            return;
        }

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const updatedProduct = {
                id: product._id,
                name: document.getElementById("name").value.trim(),
                price: parseFloat(document.getElementById("price").value),
                quantity: parseInt(document.getElementById("stock").value),
                description: document.getElementById("description").value.trim(),
            };

            try {
                await productService.updateProduct(product._id, updatedProduct);
                alert("Product updated successfully.");
                window.location.hash = "#/products";
            } catch (error) {
                alert("Error updating product.");
                console.error(error);
            }
        });

    } catch (error) {
        app.innerHTML = `<h2>Error loading product.</h2>`;
        console.error("Failed to load product:", error);
    }
}
