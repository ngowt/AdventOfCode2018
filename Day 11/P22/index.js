const fs = require('fs');
let input = "input.txt";

class FuelCell {
    constructor(position, serialNumber) {
        this.x = position.x,
        this.y = position.y,
        this.powerLevel = getPowerLevel(position, serialNumber);
        this.totalPower
    }
}

let width = 300;
let height = 300;
let grid = new Array(width).fill(0, 0).map(() => new Array(height).fill(0, 0));
let highestPower;
let topLeftCorner;
let optimalN;

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data;

    for (let x = 1; x < width; x++) {
        for (let y = 1; y < height; y++) {
            grid[x][y] = new FuelCell({x, y}, parseInt(result))
        }
    }

    console.log(grid);

    for (let x = 1; x < grid.length; x++) {
        for (let y = 1; y < grid.length; y++) {
            for (let n = 1; n < grid.length; n++) {
                grid[x][y].totalPower = getSumOfPowers({x, y}, 11);
                if (grid[x][y].totalPower > highestPower || highestPower == undefined) {
                    highestPower = grid[x][y].totalPower;
                    topLeftCorner = {x: x-1, y: y-1};
                    optimalN = 11;
                    console.log(`Answer: ${topLeftCorner.x},${topLeftCorner.y},${optimalN}, Power: ${highestPower}`);
                }
            }
        }
    }
    console.log(`Optimal N-Size: ${optimalN}`);
    console.log(`Highest Power: ${highestPower}`);
    console.log(`Answer: ${topLeftCorner.x},${topLeftCorner.y},${optimalN}`);
});

function getPowerLevel(position, serialNumber) {
    let rackId = position.x + 10;
    let powerLevel = position.y * rackId;
    powerLevel += serialNumber;
    powerLevel *= rackId;
    if (powerLevel < 100) {
        powerLevel = 0;
    } else {
        powerLevel = powerLevel.toString();
        powerLevel = powerLevel[powerLevel.length - 3];
    }
    powerLevel -= 5;
    return powerLevel;
}

function getSumOfPowers(position, size) {
    let totalPower = 0;
    if (size % 2 == 1) {
        let margin = (size - 1) / 2;
        let xMax = position.x + margin > width - 1 ? width - 1 : position.x + margin;
        let yMax = position.y + margin > height  - 1 ? height - 1 : position.y + margin;
        for (let x = position.x - margin > 0 ? position.x - margin : 1; x <= xMax; x++) {
            for (let y = position.y - margin > 0 ? position.y - margin : 1; y <= yMax; y++) {
                totalPower += grid[x][y].powerLevel;
            }
        }
    } else {
        let xMax = position.x + size > width - 1 ? width - 1 : position.x + size;
        let yMax = position.y + size > height  - 1 ? height - 1 : position.y + size;
        for (let x = position.x; x < xMax; x++) {
            for (let y = position.y; y < yMax; y++) {
                totalPower += grid[x][y].powerLevel;
            }
        }
    }
    return totalPower;
}