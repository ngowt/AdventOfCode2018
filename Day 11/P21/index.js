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

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data;

    for (let x = 1; x < width; x++) {
        for (let y = 1; y < height; y++) {
            grid[x][y] = new FuelCell({x, y}, parseInt(result))
        }
    }

    for (let x = 1; x < grid.length; x++) {
        for (let y = 1; y < grid.length; y++) {
            grid[x][y].totalPower = getSumOfPowers({x, y});
            if (grid[x][y].totalPower > highestPower || highestPower == undefined) {
                highestPower = grid[x][y].totalPower;
                topLeftCorner = {x: x-1, y: y-1};
            }
        }
    }

    console.log(`Highest Power: ${highestPower}`);
    console.log(`Corner: ${topLeftCorner.x},${topLeftCorner.y}`);
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

function getSumOfPowers(position) {
    let totalPower = 0;
    let xMax = position.x + 1 > width - 1 ? width - 1 : position.x + 1;
    let yMax = position.y + 1 > height  - 1 ? height - 1 : position.y + 1;
    for (let x = position.x - 1 > 0 ? position.x - 1: 1; x <= xMax; x++) {
        for (let y = position.y - 1 > 0 ? position.y - 1 : 1; y <= yMax; y++) {
            totalPower += grid[x][y].powerLevel;
        }
    }
    return totalPower;
}