
class Employee {

    //Private field members 
    #firstName
    #lastName
    #available
    #noWork
    #daysOff


    constructor(){
        this.#firstName = "";
        this.#lastName = "";
        this.#available = new Map();
        this.#noWork = new Map();
        this.#daysOff = [];
    }

    //Getting and seting private fields
    getavailable(){return this.#available;}
    getfirstName(){return this.#firstName;}
    getLastName(){return this.#lastName;}

    setavailable(map){
        this.#available = map;
    }
    setfirstName(name){

        this.#firstName = name;
    }
    setLastName(name){
        this.#lastName = name;
    }

    kkj(){

    }



}

function addEmployee(){
    let first = document.getElementById("Name");
    let employee = new Employee();
    employee.setfirstName(first.value);
    console.log(employee.getfirstName());
}

let x = document.getElementById("Time");
console.log(x.value);

alert("YOOOOO");