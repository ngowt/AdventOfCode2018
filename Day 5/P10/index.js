const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let result = data;
    let smallestPolymerSize;
    for (let x = 0; x < alphabets.length; x++) {
        let stack = [];
        let regex = new RegExp('[.'+alphabets[x]+']', 'gi');
        result = result.replace(regex, '');
        for (let i = 0; i < result.length; i++) {
            if (isPolarOpposites(stack[stack.length - 1], result[i])) {
                stack.pop();
            } else {
                stack.push(result[i]);
            }
        }
        if (!smallestPolymerSize)
            smallestPolymerSize = stack.length;
        smallestPolymerSize = stack.length < smallestPolymerSize ? stack.length : smallestPolymerSize;
        result = data;
    }
    console.log(smallestPolymerSize);
    return smallestPolymerSize;
});

function isPolarOpposites(unit1, unit2) {
    if (!unit1)
        return false;
        
    return (unit1.toUpperCase() === unit2 && unit2.toLowerCase() === unit1) || 
           (unit1.toLowerCase() === unit2 && unit2.toUpperCase() === unit1);
}