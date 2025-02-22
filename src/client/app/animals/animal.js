/* Name: Kyle Hosein
File name: ICE4
<Date:06/02/25>
Description: ICE4
*/

class Animal {
    name;
    breed;
    legs;
    sound;
    eyes;

    constructor({id=null, name, breed, eyes, legs, sound}){
        if(id == null){
            id = crypto.randomUUID()
        }
        this.name = name;
        this.breed = breed;
        this.eyes = eyes;
        this.legs = legs;
        this.sound = sound; 
    }

    toString(){
        return `${this.name} is a ${this.breed} and has ${this.eyes} eyes, ${this.legs} legs and makes ${this.sound} sound.`
    }

    toJSON(){
        return {
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        }
    }
}

export default Animal