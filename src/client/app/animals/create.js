import animalService from "./animal.service.js";
/* Name: Kyle Hosein
File name: ICE2
<Date:17/01/25>
Description: ICE2
*/

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');
    

    if (animalId) {
        setupEditForm(animalId);
    }

    document.getElementById('submitForm').addEventListener('click', submitAnimalForm);
});

async function setupEditForm(animalId) {
    const heading = document.querySelector('h1'); // Adjust selector if needed
    heading.textContent = 'Edit Animal';

    try {
        const animal = await animalService.findAnimal(animalId);
        console.log(animal)
        console.log(animalId)
        if (animal) {
            const form = document.getElementById('animalForm');
            form.elements['name'].value = animal.name;
            form.elements['name'].disabled = true;
            form.elements['breed'].value = animal.breed;
            form.elements['legs'].value = animal.legs;
            form.elements['eyes'].value = animal.eyes;
            form.elements['sound'].value = animal.sound;
        }
    } catch (error) {
        console.error('Error fetching animal:', error);
    }
}

async function submitAnimalForm(event) {
    event.preventDefault();
    document.getElementById('submitForm').disabled = true;
    const form = document.getElementById('animalForm');
    const animalId = new URLSearchParams(window.location.search).get('id');

    const animalData = {
        id: animalId,
        name: form.elements['name'].value,
        breed: form.elements['breed'].value,
        legs: form.elements['legs'].value,
        eyes: form.elements['eyes'].value,
        sound: form.elements['sound'].value
    };
    console.log(animalData)

    try {
        if (animalId) {
            await animalService.waitTho(3000);
            await animalService.updateAnimal(animalData); // Update existing animal
        } 
        window.location.href = `/src/client/search.html`;
    } catch (error) {
        console.error('Error saving animal:', error);
    } finally{
        document.getElementById('submitForm').disabled = true;
    }
}


