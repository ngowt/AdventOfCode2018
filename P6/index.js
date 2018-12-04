const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data.replace(/\r\n/g, '\n').split('\n');

    let fabricWidth = 0;
    let fabricHeight = 0;

    result = result.map(el =>  el.replace(/[\#\@\:\,x]/g, ' ').trim().split(' '));

    for (let i = 0; i < result.length; i++) {
        let x = parseInt(result[i][3]);
        let y = parseInt(result[i][4]);
        let width = parseInt(result[i][6]);
        let height = parseInt(result[i][7]);
        
        if (width + x > fabricWidth)
            fabricWidth = x + width;
            
        if (height + y> fabricHeight)
            fabricHeight = y + height;
    }

    let fabric = Array(fabricWidth).fill().map( () => Array(fabricHeight).fill(0));
    let dict = {};
    result.forEach( el => {
        let id = parseInt(el[0]);
        let x = parseInt(el[3]);
        let y = parseInt(el[4]);
        let width = parseInt(el[6]);
        let height = parseInt(el[7]);
        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                if (fabric[i][j] === 0) {
                    fabric[i][j] = id;
                    if (dict[id] !== 1) {
                        dict[id] = 0;
                    }
                } else {
                    dict[id] = 1;
                    dict[fabric[i][j]] = 1;
                }
            }
        }
    });

    for (let key in dict) {
        if (dict[key] === 0) {
            console.log(key);
            return key;
        } 
    }
});