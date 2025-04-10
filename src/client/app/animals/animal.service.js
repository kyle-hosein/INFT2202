/* Name: Kyle Hosein
File name: ICE2
<Date:17/01/25>
Description: ICE2
*/
/*
 *  Service constructor
 */
let apiKey = "7cdceee2-a86a-4b22-b68a-3e95067b7ae7";
const url = "https://inft2202.opentech.durhamcollege.org/api/animals";
function AnimalService() {
    function initAnimals() {
        let animals = [];
        let index = 0;
        while (animals.length < 300) {
            animals.push({
                id: index, // Adding unique ID
                name: `name ${index++}`,
                breed: "Grizzly Bear",
                legs: 4,
                eyes: 2,
                sound: "Moo"
            });
        }

        // If there's no entry for animals in localStorage, initialize it
        // if (!localStorage.getItem('animals')) {
        //     localStorage.setItem('animals', JSON.stringify(animals));
        // }
    }

    initAnimals();
}

AnimalService.prototype.getAnimals = async function () {
    try {
        let response = await fetch(`${url}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            }})
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data.records);
        return data.records    
    } catch (error) {
        throw new Error(error);
        
    }
};

AnimalService.prototype.findAnimal = async function (id) {
    const animals = this.getAnimals();
    const animal = animals.find(animalee => animalee.id == id);
    if (!animal) {
        throw new Error(`Animal with id ${id} not found`);
    }
    return animal;
};

AnimalService.prototype.waitTho = async function (ms) {
    showSpinner(); // Show spinner when waiting
    return new Promise(resolve => setTimeout(() => {
        hideSpinner(); // Hide spinner after wait is done
        resolve();
    }, ms));
}

// Show full-page spinner
function showSpinner() {
    let spinner = document.createElement("div");
    spinner.id = "page-spinner";
    spinner.innerHTML = `
        <div class="spinner-overlay">
            <div class="spinner-border text-light" role="status"></div>
        </div>
    `;
    document.body.appendChild(spinner);
}

// Hide full-page spinner
function hideSpinner() {
    let spinner = document.getElementById("page-spinner");
    if (spinner) spinner.remove();
}



AnimalService.prototype.updateAnimal = async function (animalUpdate) {
    let animals = this.getAnimals();
    const index = animals.findIndex(animal => animal.id == animalUpdate.id);

    if (index === -1) {
        throw new Error('Animal not found');
    }

    animals[index] = { ...animals[index], ...animalUpdate };
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
};

AnimalService.prototype.deleteAnimal = async function (animalDelete) {
    let animals = this.getAnimals();
    const filteredAnimals = animals.filter(animal => animal.id !== animalDelete.id);
    if (filteredAnimals.length === animals.length) {
        throw new Error('Animal not found and cannot be deleted');
    }

    localStorage.setItem('animals', JSON.stringify(filteredAnimals));
    return true;
};

AnimalService.prototype.createAnimal = async function(animalCreate) {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify(animalCreate)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }

}

export default new AnimalService();
