const inquirer = require("inquirer");
const fs = require("fs");

const LICENSES = {
    "Apache":
    {
        "Apache 2.0 License": "[![License](https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)"
    },
    "Boost":
    {
        "Boost Software License 1.0": "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"
    },
    "BSD":
    {
        "BSD 3-Clause License": "[![License](https://img.shields.io/badge/License-BSD_3--Clause-orange.svg)](https://opensource.org/licenses/BSD-3-Clause)"
    },
    "Creative Commons":
    {
        "CC0": "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
        "Attribution 4.0 International": "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",
        "Attribution-ShareAlike 4.0 International": "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)",
        "Attribution-NonCommercial 4.0 International": "[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)",
        "Attribution-NoDerivates 4.0 International": "[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)",
        "Attribution-NonCommmercial-ShareAlike 4.0 International": "[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)",
        "Attribution-NonCommercial-NoDerivatives 4.0 International": "[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)"
    },
    "Eclipse":
    {
        "Eclipse Public License 1.0": "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)"
    },
    "GNU":
    {
        "GNU GPL v3": "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
        "GNU GPL v2": "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
        "GNU AGPL v3": "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
        "GNU LGPL v3": "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
        "GNU FDL v1.3": "[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)"
    },
    "The Organization for Ethical Source":
    {
        "The Hippocratic License 2.1": "[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)",
        "The Hippocratic License 3.0": "[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)"
    },
    "IBM":
    {
        "IBM Public License Version 1.0": "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)"
    },
    "ISC":
    {
        "ISC License (ISC)": "[![License: ICL](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
    },
    "MIT":
    {
        "The MIT License": "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"
    },
    "Mozilla":
    {
        "Mozilla Public License 2.0": "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)"
    },
    "Open Data Commons": {
        "Attribution License (BY)": "[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)",
        "Open Database License (ODbL)": "[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)",
    },
    "Perl":
    {
        "The Perl License": "[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
        "The Artistic License 2.0": "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)"
    },
    "SIL":
    {
        "SIL Open Font License 1.1": "[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)"
    },
    "Unlicense":
    {
        "The Unlicense": "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)"
    },
    "WTFPL":
    {
        "The Do What the Fuck You Want to Public License": "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)"
    },
    "Zlib":
    {
        "The zlib/libpng License": "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)"
    },
    "None": {
        "None": ""
    }
}

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ALL_LICENSES_BY_KEYS = {};

const CHOICES = generateChoices();

function generateChoices() {
    var choicesArr = []
    Object.keys(LICENSES).forEach(type => {
        choicesArr.push(new inquirer.Separator("----" + type + "----"));
        var licensesByType = LICENSES[type];
        Object.assign(ALL_LICENSES_BY_KEYS, licensesByType);
        Object.keys(licensesByType).forEach(license => {
            choicesArr.push(license);
        })
    })
    return choicesArr;
}

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
        choices: CHOICES
    },
    {
        type: "input",
        name: "description",
        message: "Enter the Readme description:"
    },
    {
        type: "input",
        name: "usage_information",
        message: "Please provide usage information"
    }

]


inquirer
    .prompt(QUESTIONS)
    .then((responses) => {
        var readmeString = formulateString(responses);
        writeReadmeFile(readmeString);
    });

function formulateString(responses) {
    console.log(responses);
    var readMe = new README(responses);
    return readMe.render();
}

const README = function (responses) {
    this.title = `#  ${responses.title}\n`;
    this.licenseBadge = ALL_LICENSES_BY_KEYS[responses.license] + `\n`;
    this.description = `## Description \n\n${responses.description}\n`;
    this.tableOfContent =
        `## Table of Contents
    - [Installation](#installation)
    - [Usage](#usage)
    - [License](#license)
    - [Contributing](#contributing)
    - [Tests](#tests)
    - [Questions](#questions)`

    this.installation = `## Installation \n\n${responses.installation}\n`;
    this.usage = `## Usage \n\n${responses.usage}\n`;
    this.license = `## License \n\n${responses.license}\n`;
this.contributing
this.tests = 
    this.questions = `## Questions \n\n If you have any more questions, please contact me here:\nGithub Username: ${responses.gitUsername}\nEmail: ${responses.email}\n`;
    this.render = function () {
        return this.title + this.licenseBadge + this.description
    }
}

function writeReadmeFile(readmeString) {
    const fileName = "README.md";
    console.log(readmeString)
    fs.writeFile(fileName, readmeString, (err) => 
        err ? console.log(err) : console.log("Success!")
    );
}

