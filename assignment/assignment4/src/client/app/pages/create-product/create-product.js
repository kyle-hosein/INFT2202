import { ProductService } from '../../product.service';
import template from './create-product.ejs';
const productService = new ProductService();

export default async function createProduct(route) {
    const data = await onInit(route);
    const html = template(data);
    document.getElementById('content').innerHTML = html;
    onRender();
}

async function onInit(route) {
    // Can preload data or return empty if this is a fresh form
    return { title: 'Create a New Product' };
}

function onRender() {
    const form = document.getElementById('product-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear previous validation
        form.classList.remove('was-validated');

        const name = document.getElementById('name').value.trim();
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const description = document.getElementById('description').value.trim();

        if (!name || isNaN(price) || isNaN(stock) || !description) {
            form.classList.add('was-validated');
            return;
        }

        const productData = {
            name,
            price,
            stock,
            description,
        };

        console.log('Creating product:', productData);
        await productService.addProduct(productData);

        alert('Product created successfully!');
        form.reset();
    });
}
