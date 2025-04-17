// src/client/app/components/footer/footer.js
export default async function footer() {
    const response = await fetch('footer');
    let html = await response.text();
    document.getElementById('footer').innerHTML = html;
}
