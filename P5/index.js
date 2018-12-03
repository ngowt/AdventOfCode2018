const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data.replace(/\r\n/g, '\n').split('\n');

    let fabricWidth = 0;
    let fabricHeight = 0;
    let contested = 0;

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

    let fabric = Array(fabricWidth+1).fill().map( () => Array(fabricHeight+1).fill(0));
    result.forEach( el => {
        let x = parseInt(el[3]);
        let y = parseInt(el[4]);
        let width = parseInt(el[6]);
        let height = parseInt(el[7]);
        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                if (fabric[i][j] === 1) {
                    fabric[i][j] = 2;
                    contested++;
                } else if (fabric[i][j] === 0) {
                    fabric[i][j] = 1;
                }
            }
        }
    });
    console.log(contested);
    return contested;
});