import Navigo from 'navigo';

// Components
import header from './components/header/header.js';
import footer from './components/footer/footer.js';

// Pages
import home from './pages/home/home.js';
import about from './pages/about/about.js';
import listProducts, { afterRender } from './pages/list-products/list-products.js';
import createProduct from './pages/create-product/create-product.js';
import updateProduct from './pages/update-product/update-product.js';

const router = new Navigo('/', { hash: true });

// Page setup helper
async function mountPage(pageHandler) {
    const app = document.getElementById('content');
    const content = await pageHandler();
    if (typeof content === 'string') {
        app.innerHTML = content;
        afterRender();
    }
}

// Setup layout and routing
window.addEventListener('DOMContentLoaded', async () => {
    await header();
    await footer();

    router.on({
        '/': () => mountPage(home),
        '/about': () => mountPage(about),
        '/products': () => mountPage(listProducts),
        '/create-product': () => mountPage(createProduct),
        '/update-product/:id': ({ data }) => mountPage(() => updateProduct({ id: data.id  }))
    });


    router.notFound(() => {
        document.getElementById('app').innerHTML = '<h2>Page not found</h2>';
    });

    router.resolve();
});
