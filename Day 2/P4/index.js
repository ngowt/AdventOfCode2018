const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    result = data.replace(/\r\n/g, '\n').split('\n');

    for (let i = 0; i < result.length; i++) {
        for (let j = i + 1; j < result.length; j++) {
            let [sourceString, targetString] = [result[i], result[j]];
            for (let [k, isFound] = [0, false]; k < sourceString.length && !isFound; k++) {
                if (sourceString[k] !== targetString[k]) {
                    isFound = true;
                    if (sourceString.substring(k+1, sourceString.length) === targetString.substring(k+1, targetString.length)) {
                        let [strBeforek, strAfterk] = [sourceString.substring(0, k), sourceString.substring(k+1, sourceString.length)];
                        console.log(strBeforek + strAfterk);
                        return strBeforek + strAfterk;
                    }
                } 
            }
        }
    }
});