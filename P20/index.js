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
let smallestWidth;
let smallestHeight;

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

    smallestWidth = !smallestWidth ? getBoundDimensions(stars).boundWidth : getBoundDimensions(stars).boundWidth < smallestWidth ? getBoundDimensions(stars).boundWidth : smallestWidth;
    smallestHeight = !smallestHeight ? getBoundDimensions(stars).boundHeight : getBoundDimensions(stars).boundHeight < smallestHeight ? getBoundDimensions(stars).boundHeight : smallestHeight;
    
    let i = -1;
    while (getBoundDimensions(stars).boundWidth <= smallestWidth && getBoundDimensions(stars).boundHeight <= smallestHeight) {
        smallestWidth = !smallestWidth ? getBoundDimensions(stars).boundWidth : getBoundDimensions(stars).boundWidth < smallestWidth ? getBoundDimensions(stars).boundWidth : smallestWidth;
        smallestHeight = !smallestHeight ? getBoundDimensions(stars).boundHeight : getBoundDimensions(stars).boundHeight < smallestHeight ? getBoundDimensions(stars).boundHeight : smallestHeight;
        skipTime();
        i++;
        console.log(smallestWidth, smallestHeight, i);
    }
});

function skipTime() {
    stars = stars.map( el => {
        el.position.x = parseInt(el.position.x) + parseInt(el.velocity.x);
        el.position.y = parseInt(el.position.y) + parseInt(el.velocity.y);
        return el;
    });
}

function getBoundDimensions(stars) {
    let leftBound;
    let bottomBound;
    let rightBound;
    let topBound;
    let boundWidth;
    let boundHeight;
    for (let i = 0; i < stars.length; i++) {
        if (!leftBound || parseInt(stars[i].position.x) < parseInt(leftBound))
            leftBound = parseInt(stars[i].position.x);

        if (!rightBound || parseInt(stars[i].position.x) > parseInt(rightBound))
            rightBound = parseInt(stars[i].position.x);

        if (!bottomBound || parseInt(stars[i].position.y) > parseInt(bottomBound))
            bottomBound = parseInt(stars[i].position.y);

        if (!topBound || parseInt(stars[i].position.y) < parseInt(topBound))
            topBound = parseInt(stars[i].position.y);
    }
    boundWidth = Math.abs(rightBound - leftBound);
    boundHeight = Math.abs(bottomBound - topBound);
    return { boundWidth, boundHeight };
}