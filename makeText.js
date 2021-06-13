/** Command-line tool to generate Markov text. */

const process = require('process')
const fs = require('fs')
const axios = require('axios');
const { MarkovMachine } = require('./markov')
const argv = process.argv;

function fromFile(filename) {
    fs.readFile(filename, "utf8", function (err, data) {
        if (err) {
            console.log("An error occured reading from file: ", err);
            process.kill(2);
        }
        let mm = new MarkovMachine(data);
        let newText = mm.makeText(50);
        console.log(newText);
    });
}

async function fromWeb(url) {
    try {
        let resp = await axios.get(url);
        let mm = new MarkovMachine(resp.data);
        let newText = mm.makeText(50);
        console.log(newText);
    } catch (err) {
        console.log("An error occured while fetching from url: ", err);
        process.kill(1);
    }
}



if (argv[2].toLowerCase() === "file") {
    fromFile(argv[3]);
} else if (argv[2].toLowerCase() === "url") {
    fromWeb(argv[3]);
} else {
    console.log(`Sorry, could not compute. Please enter in format:
     node makeText.js file [filename]
     or
     node makeText.js url [URL]`);
}
