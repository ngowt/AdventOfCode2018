const fs = require('fs');

let frequency = 0;
let result = [];
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    result = data.replace(/\r\n/g, '\n').split('\n');
    result.forEach( el => frequency += parseInt(el));
    console.log(frequency);
});
