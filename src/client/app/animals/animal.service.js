/* Name: Kyle Hosein
File name: ICE2
<Date:17/01/25>
Description: ICE2
*/
/*
 *  Service constructor
 */
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
    console.log(initAnimals())
    // if there is no entry for animals in local storage
    if (!localStorage.getItem('animals')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage  
        // create a new entry in local storage and put the animal array in it        
        localStorage.setItem('animals', JSON.stringify(initAnimals()))
    }    
}
/*
 *
 */
AnimalService.prototype.getAnimals = function() {
    // this will always be set, because we did it in the constructor
    return JSON.parse(localStorage.getItem('animals'));
}

export default new AnimalService();