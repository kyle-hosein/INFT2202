

function AnimalService() {
    function initAnimals(){
        let animals = [];
        let index = 0;
        while(animals.length<300) {
            animals.push({
                "name": `name ${index++}`,
                "breed": "Grizzly Bear",
                "legs": 4,
                "eyes": 2,
                "sound": "Moo"
              });
        }
        return animals;
    }
    // if there is no entry for animals in local storage
    if (!localStorage.getItem('animals')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
        // create a new entry in local storage and put an empty array in it        
        localStorage.setItem('animals', JSON.stringify([]))
    }    
}
/*
 *
 */
AnimalService.prototype.listAnimals = function() {
    // this will always be set, because we did it in the constructor
    return JSON.parse(localStorage.getItem('animals'));
}
AnimalService.prototype.findAnimal = function(id) {
    // this will always be set, because we did it in the constructor
    let records = JSON.parse(localStorage.getItem('animals'));
    let animal = records.find(record => record.animalId === id);
    if(!animal){
        throw new Error("That animal doesn\'t exist!") 
    }
    return animal;
}

AnimalService.prototype.createAnimal = function(animalModel){
    let records = JSON.parse(localStorage.getItem('animals'));
    let animal = records.find(record => animalModel.name === record.name);
    if(animal){
        throw new Error("That animal already exist!") 
    }
    return true;
}

/*
 *
 */
AnimalService.prototype.updateAnimal = function(animalModel) {
    let records = JSON.parse(localStorage.getItem('animals')) || [];

    let index = records.findIndex(record => animalModel.id === record.id);
    
    if (index !== -1) {
        records[index] = {
            id: animalModel.id,
            name: animalModel.name,
            breed: animalModel.breed,
            legs: animalModel.legs,
            eyes: animalModel.eyes,
            sound: animalModel.sound
        };

        localStorage.setItem('animals', JSON.stringify(records)); // Save updated records

        return true;
    }

    return false;
};
/*
 *
 */
AnimalService.prototype.deleteAnimal = function(animalModel) {
    let records = JSON.parse(localStorage.getItem('animals')) || [];

    let filteredRecords = records.filter(record => record.id !== animalModel.id);

    if (filteredRecords.length !== records.length) {
        localStorage.setItem('animals', JSON.stringify(filteredRecords));
        return true; // Animal was deleted
    }

    return false; // No matching animal found
};


export default new AnimalService();