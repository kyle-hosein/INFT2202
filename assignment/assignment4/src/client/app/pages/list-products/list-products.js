// list-products.js
import { render } from "../../lib/render.js";
import view from "../list-products/list-products.ejs";
import { ProductService } from "../../product.service.js";

const productService = new ProductService();

export default async function listProducts() {
    try {
        const products = await productService.getAllProducts();

        // Return rendered HTML — don't touch DOM yet
        return render(view, { products });
    } catch (err) {
        console.error(err);
        return "<h2>Error loading products</h2>";
    }
}

export function afterRender() {
    // DELETE BUTTON CLICK
    document.querySelectorAll('.delete-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            console.log(id);
            const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
            document.getElementById('confirmDelete').dataset.id = id;
            modal.show();
        });
    });

    // CONFIRM DELETE
    const confirmBtn = document.getElementById('confirmDelete');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', async () => {
            const id = confirmBtn.dataset.id;
            try {
                await productService.deleteProduct(id);
                location.reload(); // Easy way to re-fetch page — or rerender if you have a router
            } catch (err) {
                console.error('Delete failed:', err);
            }
        });
    }

    // EDIT BUTTON CLICK
    document.querySelectorAll('.edit-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            console.log(id);
            window.location.hash = `/update-product/${id}`;
        });
    });
}
