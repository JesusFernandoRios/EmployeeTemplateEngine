// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email,gitHub){
        super(name,id,email)
        
        this.gitHub = gitHub

    }

    getGithub(){
        return this.gitHub
    }

    getRole(){
        return console.log ('engineer')
    } // Overridden to return 'Engineer'
}


let test = new Engineer ('bob', 234, 'fake@fakeemail.com','fakegithub')
console.log(test)

test.getGithub();
test.getRole();






