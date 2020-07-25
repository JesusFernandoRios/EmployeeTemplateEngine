const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const { type } = require("os");

const teamMembers = [];

const manager = [
    {
        type: 'input',
        name: 'team',
        message: 'Welcome! Please enter a name for this team or project'
    },
    {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the team/project manager'
    },
    {
        type: 'input',
        name: 'managerId',
        message: `Enter the manager's ID`
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: `Now enter the manager's E-mail`
    },
    {
        type: 'input',
        name: 'managerOffice',
        message: `Lastly enter the manager's office number`
    },
]

function employees (){
    inquirer.prompt([
        {
            type:'list',
            name:'roles',
            message:`Select the role of the employee`,
            choices: ['Intern','Engineer']
        },
        {
            type:'input',
            name:'employeeName',
            message:'What is the employees name?'
        },
        {
            type:'input',
            name:'employeeId',
            message:'Please enter employees ID'
        },
        {
            type:'input',
            name:'employeeEmail',
            message:'Enter employee E-mail'
        }
    ]).then((emprole) => {

        console.log(emprole)

        if(emprole.roles === 'Intern'){
            inquirer.prompt([
            {
            type:'input',
            name:'school',
            message:'Please enter the Interns school name'
            },
            ]).then((empint) => {
                console.log(empint)
                const intern = new Intern(emprole.employeeName, emprole.employeeId, emprole.employeeEmail, empint.school);
                
                teamMembers.push(intern);

                reprompt()
            })
        }else if(emprole.roles === 'Engineer'){
            inquirer.prompt([
            {
            type:'input',
            name:'github',
            message:'Please the Engineers github'
            },   
            ]).then((empeng) => {
                console.log(empeng)
                const engineer = new Engineer(emprole.employeeName, emprole.employeeId, emprole.employeeEmail, empeng.github)

                teamMembers.push(engineer);

                reprompt()
            })
        }
        
    })
}

function reprompt() {
    inquirer.prompt([
        {
        type:'list',
        name:'add',
        message:'Would you like to add another employee?',
        choices:['yes', 'no']
        }   
    ]).then((addemp) => {
        if(addemp.add === 'yes'){
            employees()
        }else{
            console.log('all set!')

            console.log(teamMembers)

            let renderTeam = render(teamMembers)

            fs.writeFile(outputPath, renderTeam, (err)=>{
                if(err)throw error
            })
        }

    })
   
}

inquirer.prompt(manager).then((answers) => {

    console.log(answers)
    let boss = new Manager(answers.name, answers.managerId, answers.managerEmail, answers.managerOffice)

    
    
    teamMembers.push(boss)

    console.log('This next section will be for Employee informaton only')
    employees()
    
})



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
