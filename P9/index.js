const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data;
    let stack = [];
    for (let i = 0; i < result.length; i++) {
        if (isPolarOpposites(stack[stack.length - 1], result[i])) {
            stack.pop();
        } else {
            stack.push(result[i]);
        }
    }
    console.log(stack.length);
    return stack.length;
});

function isPolarOpposites(unit1, unit2) {
    if (!unit1)
        return false;
    return (unit1.toUpperCase() === unit2 && unit2.toLowerCase() === unit1) || 
           (unit1.toLowerCase() === unit2 && unit2.toUpperCase() === unit1);
}