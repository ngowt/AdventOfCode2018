const fs = require('fs');
let input = "input.txt";

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data.replace(/\r\n/g, '\n').split('\n');
    let smallestX;
    let smallestY;
    let width = 0;
    let height = 0;
    let largestArea = 0;
    let dict = {};

    for (let i = 0; i < result.length; i++) {
        let x = parseInt(result[i].split(', ')[0]);
        let y = parseInt(result[i].split(', ')[1]);
        dict[i] = {
            coordinate: [x, y],
            maxArea: 0
        };

        if (!smallestX || x < smallestX)
            smallestX = x;

        if (!smallestY || y < smallestY)
            smallestY = y;

        if (x > width)
            width = x;

        if (y > height)
            height = y;
    }

    let grid = Array(width).fill().map( () => Array(height).fill(-1));
   
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let shortestDistance;
            for (let key in dict) {
                if (shortestDistance === undefined) {
                    shortestDistance = getTaxiCabDistance([x, y], dict[key].coordinate);
                    grid[x][y] = {
                        id: key,
                        contested: false
                    };
                    continue;
                } else if (getTaxiCabDistance([x, y], dict[key].coordinate) < shortestDistance) {
                    shortestDistance = getTaxiCabDistance([x, y], dict[key].coordinate);
                    grid[x][y].id = key,
                    grid[x][y].contested = false
                } else if (getTaxiCabDistance([x, y], dict[key].coordinate) === shortestDistance) {
                    grid[x][y].contested = true;
                }
            }
            if (!grid[x][y].contested)
                dict[grid[x][y].id].maxArea++;
        }
    }
    
    let newDict = {};
    for (let key in dict) {
        if ((dict[key].coordinate[0] > smallestX && dict[key].coordinate[0] < width) && (dict[key].coordinate[1] > smallestY && dict[key].coordinate[1] < height)) {
            newDict[key] = dict[key]
        }
    }

    console.log(newDict);
    for (let key in newDict) {
        if (largestArea < newDict[key].maxArea)
            largestArea = newDict[key].maxArea;
    }
    console.log("Largest Area: " + largestArea);
    
    return largestArea;
});

function getTaxiCabDistance(point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}