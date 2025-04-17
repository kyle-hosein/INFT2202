/*
    
*/
// Web Shop - Common Functions
// Author: Kyle Hosein
// Date: [Current Date]
// Description: Common functions used across all pages.

document.addEventListener("DOMContentLoaded", function () {
    // Set current year in footer
    document.getElementById("footer-year").textContent = new Date().getFullYear();

    // Highlight active navigation link
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

