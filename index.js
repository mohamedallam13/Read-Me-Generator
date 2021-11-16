const inquirer = require("inquirer");
const fs = require("fs");

const QUESTIONS_ARRAY = [
    {
        type: "input",
        name: "gitUsername",
        message: "What is your Github Username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of the readme file?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of the readme file?"
    }

]

var contentString = "";



inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your name?",
        },
        {
            type: "checkbox",
            message: "What languages do you know?",
            name: "stack",
            choices: ["HTML", "CSS", "JavaScript", "MySQL"],
        },
        {
            type: "list",
            message: "What is your preferred method of communication?",
            name: "contact",
            choices: ["email", "phone", "telekinesis"],
        },
    ])
    .then((data) => {
        formulateString(data);
        writeReadmeFile();
    });

function writeReadmeFile() {
    const fileName = "README.md";
    fs.writeFile(filename, contentString, (err) =>
        err ? console.log(err) : console.log("Success!")
    );
}
