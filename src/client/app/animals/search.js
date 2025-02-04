import animalService from "./animal.service.js";

/* Name: Kyle Hosein
File name: ICE2
<Date:17/01/25>
Description: ICE2
*/
const animals = animalService.getAnimals();
console.log(animals)

function toggleTableVisibilty(animalList=animals){
    if(animalList){
        const messageBox = document.getElementById("message-box");
        messageBox.className += "d-none";
        const animalTable = document.getElementById("animals-list");
        animalTable.className = "table table-striped"
    }
}

function drawAnimalsTable(animalList=animals){
    if (animalList) {
        const animalTable = document.getElementById("table-body"); // Use querySelector instead of querySelectorAll
        
        // Clear existing rows to prevent duplication
        animalTable.innerHTML = "";

        // Loop through the animal list and create table rows
        animalList.forEach(animal => {
            let row = animalTable.insertRow(); 

            // Insert cells and add values
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
            cell6.innerHTML = `<button class="btn btn-primary">
                                    <i class="fa-regular fa-user"></i>
                                </button>
                                <button class="btn btn-danger">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                                `;
        });
    }
}

toggleTableVisibilty();
drawAnimalsTable();