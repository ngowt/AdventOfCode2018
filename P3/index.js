const fs = require('fs');
let input = "input.txt";

/* 
    Checksum is determined by multiplying the number of lines that contain...
    - at least 2 of the same letter (max 1 per line)
    - at least 3 of the same letter (max 1 per line)
*/

let twos = 0;
let threes = 0;

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    result = data.replace(/\r\n/g, '\n').split('\n');
    result.forEach(el => {
        let dict = {};
        let isThreeFound = false;
        let isTwoFound = false;
        for (let char of el) {
            if (dict[char]) {
                dict[char] += 1;
            } else {
                dict[char] = 1;
            }
        }

        for (let key in dict) {
            if (dict[key] === 3 && !isThreeFound) {
                isThreeFound = true;
                threes++;
            } else if (dict[key] === 2 && !isTwoFound) {
                isTwoFound = true;
                twos++;
            }
        }
    });
    console.log(twos * threes);
    return twos * threes;
});
