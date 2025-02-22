/* Name: Kyle Hosein
File name: ICE2
<Date:17/01/25>
Description: ICE2
*/

import animalMockService from "./animals/animal.mock.service.js";
import Animal from "./animals/animal.js";
// create a handler to deal with the submit event
function submitAnimalForm ( event ) {
    // prevent the default action from happening
    event.preventDefault();
    // get a reference to the form (from the event)
    const animalForm = event.target;  
    // validate the form
    const valid = validateAnimalForm(animalForm);
    // do stuff if the form is valid
    if (valid) {
        const formData = new FormData(animalForm);
        //create a javascript object to hold the form data
        const animalObject = {};
        formData.forEach((value, key) => {
            console.log(value)
        });
    } else {
        console.log('Error Message');
    }
}

// validate the animal form
function validateAnimalForm ( form ) {
    let valid = true;
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling
    if (name == "") {
        eleNameError.classList.remove('d-none');
        eleNameError.textContent = "You must name this animal!";
        valid = false;
    } else {
        eleNameError.classList.add('d-none');
    }
    return valid
}