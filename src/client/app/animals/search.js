import animalService from "./animal.service.js";

/* Name: Kyle Hosein
File name: ICE2
<Date:17/01/25>
Description: ICE2
*/
const animals = animalService.getAnimals();
console.log(animals);

let currentPage = 1;
const itemsPerPage = 5; // Show 5 items per page

function toggleTableVisibility(animalList = animals) {
    if (animalList.length > 0) {
        const messageBox = document.getElementById("message-box");
        messageBox.classList.add("d-none");
        const animalTable = document.getElementById("animals-list");
        animalTable.className = "table table-striped";
    }
}

function displayMessage() {
    const messageBox = document.getElementById("message-box");
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.classList.add("d-none")
    messageBox.classList.remove("d-none", "alert-danger");
    messageBox.classList.add("alert-success");
    const animalTable = document.getElementById("animals-list");
    animalTable.className = "table table-striped d-none";
    messageBox.textContent = "Animal has been deleted";
}

function drawAnimalsTable(animalList = animals, page = 1) {
    const animalTable = document.getElementById("table-body");
    animalTable.innerHTML = "";

    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedAnimals = animalList.slice(start, end);

    paginatedAnimals.forEach(animal => {
        let row = animalTable.insertRow();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.textContent = animal.name;
        cell2.textContent = animal.breed;
        cell3.textContent = animal.legs;
        cell4.textContent = animal.eyes;
        cell5.textContent = animal.sound;
        cell6.innerHTML = `
            <button class="btn btn-primary edit-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="This is to edit" data-animal='${JSON.stringify(animal)}'>
                <i class="fa-regular fa-user"></i>
            </button>
            <button class="btn btn-danger delete-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="This is to delete" data-animal='${JSON.stringify(animal)}'>
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
    });

    attachEventListeners();
    generatePagination(animalList);
}

function attachEventListeners() {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const animalData = this.getAttribute("data-animal");
            const animalObj = JSON.parse(animalData);
            console.log(animalObj);

            let myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
            myModal.show();
            document.getElementById("modal-body").textContent = `Are you sure you want to delete animal ${animalObj.breed}?`;

            document.getElementById("modalOk").addEventListener("click", async function(event) {
                event.preventDefault();
                await animalService.waitTho(3000); 
                animalService.deleteAnimal(animalObj);
                drawAnimalsTable();
                displayMessage();
                myModal.hide();
                location.reload();
            });
        });
    });

    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const animalData = this.getAttribute("data-animal");
            const animalObj = JSON.parse(animalData);
            location.href = `/src/client/create.html?id=${animalObj.id}`;
        });
    });
}

// Generate scrollable pagination
function generatePagination(animalList) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    let pageCount = Math.ceil(animalList.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement("button");
        btn.textContent = i;
        btn.classList.add("btn", "btn-light", "mx-1");

        if (i === currentPage) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", function() {
            currentPage = i;
            drawAnimalsTable(animals, currentPage);
            scrollToCurrentPage();
        });

        paginationContainer.appendChild(btn);
    }

    // Enable/disable previous & next buttons
    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === pageCount;
}

// Scroll to the current page in the pagination bar
function scrollToCurrentPage() {
    const paginationDiv = document.getElementById("pagination");
    const activeButton = paginationDiv.querySelector(".active");

    if (activeButton) {
        paginationDiv.scrollTo({
            left: activeButton.offsetLeft - paginationDiv.offsetWidth / 2,
            behavior: "smooth"
        });
    }
}

// Handle Previous and Next Buttons
document.getElementById("prevPage").addEventListener("click", function() {
    if (currentPage > 1) {
        currentPage--;
        drawAnimalsTable(animals, currentPage);
        scrollToCurrentPage();
    }
});

document.getElementById("nextPage").addEventListener("click", function() {
    let totalPages = Math.ceil(animals.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        drawAnimalsTable(animals, currentPage);
        scrollToCurrentPage();
    }
});

// Initial setup
toggleTableVisibility();
await animalService.waitTho(3000)
drawAnimalsTable();
