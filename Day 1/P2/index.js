const fs = require('fs');

let frequency = 0;
let result = [];
let dict = {};
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    result = data.replace(/\r\n/g, '\n').split('\n');

    let found = false; 
    while (!found) {
        for (let el of result) {
            frequency += parseInt(el);
            if (dict[frequency]) {
                found = true;
                console.log(frequency);
                return frequency;
            } 
            dict[frequency] = 1;
        }
    }
});
