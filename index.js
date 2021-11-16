const inquirer = require("inquirer");
const fs = require("fs");

const LICENSES_LIST = ["a", "b", "c"];
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const QUESTIONS = [
    {
        type: "input",
        name: "gitUsername",
        message: "What is your Github Username?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
        validate: function (input) {
            if (EMAIL_REGEX.test(input)) return true;
            return "Please enter a valid email!"
        }
    },
    {
        type: "input",
        name: "title",
        message: "What is the title of the Readme?"
    },
    {
        type: "list",
        name: "license",
        message: "Please choose a license:",
        choices: LICENSES_LIST
    },
    {
        type: "input",
        name: "description",
        message: "Enter the Readme description:"
    },

]


const README = function (responses) {
    this.title = "# " + responses.title;
}




inquirer
    .prompt(QUESTIONS)
    .then((responses) => {
        formulateString(responses);
        //writeReadmeFile();
    });

function formulateString(data) {
    console.log(data);
}

function writeReadmeFile() {
    const fileName = "README.md";
    fs.writeFile(filename, contentString, (err) =>
        err ? console.log(err) : console.log("Success!")
    );
}

