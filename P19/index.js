const fs = require('fs');
let input = "input.txt";

class Star {
    constructor(position, velocity) {
        this.position = {
            x: position[0],
            y: position[1]
        }
        this.velocity = {
            x: velocity[0],
            y: velocity[1]
        }
    }
}

let stars = [];

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let pvRegex = /(\<)(.*?)(\>)/g;
    let result = data;
    result = data.replace(/\r\n/g, '\n').split('\n');
    stars = result.map(el => {
        let match = el.match(pvRegex);
        let position = match[0].replace('<', '').replace('>', '').split(', ');
        let velocity = match[1].replace('<', '').replace('>', '').split(', ');
        return new Star(position, velocity);
    });
});

function skipTime() {
    stars = stars.map( el => {
        el.position.x = parseInt(el.position.x) + parseInt(el.velocity.x);
        el.position.y = parseInt(el.position.y) + parseInt(el.velocity.y);
        return el;
    });
}