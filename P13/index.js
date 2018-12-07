const fs = require('fs');
let input = "input.txt";

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.prerequisites = [];
        this.isExecuted = false;
    }
}

let dict = {};
let executionStack = [];
let options = [];

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    let result = data;
    result = data.replace(/\r\n/g, '\n').split('\n');
    let allNodes = [];
    let allChildrenNodes = [];
    
    result.map( el => {
        let node = el[5];
        let child = el[36];

        if (allNodes.indexOf(node) === -1) {
            allNodes.push(node);
        }

        if (allNodes.indexOf(child) === -1) {
            allNodes.push(child);
        }

        if (allChildrenNodes.indexOf(child) === -1)
            allChildrenNodes.push(child);

        if (!dict[node]) {
            dict[node] = new Node(node);
        }

        if (!dict[child]) {
            dict[child] = new Node(child);
        }

        dict[node].children.push(child);
        dict[child].prerequisites.push(node);
    });

    for (let node in dict) {
        dict[node].children.sort();
        dict[node].prerequisites.sort();
    }

    options = allNodes.filter(el => !allChildrenNodes.includes(el)).sort();
    options.map( el => execute(dict[el]));
});

function execute(node) {
    if (isAbletoExecute(node) && !node.isExecuted) {
        node.isExecuted = true;
        if (options.indexOf(node.value) !== -1)
            options.splice(options.indexOf(node.value), 1);
        
        executionStack.push(node.value);
        node.children.map( el => {
            if (options.indexOf(el) === -1 && !dict[el].isExecuted) 
                options.push(el);
        });
        
        let output = "";
        executionStack.map( el => {
            output = output.concat(el);
        })
        console.log("ExecutionStack: ", output);

        output = "";
        options.map( el => {
            output = output.concat(el);
        })
        console.log("Options:", output);
        console.log("---------------------------");

        options.sort().map(el => execute(dict[el]));
    }
}

function isAbletoExecute(node) {
    for (let i = 0; i < node.prerequisites.length; i++) {
        if (!dict[node.prerequisites[i]].isExecuted)
            return false;
    }
    return true;
}

// UNSORTED CHILDREN
// GWTOCHKYNJZSXALFMBIDRPEVUQ

// SORTED CHILDREN
// GONYHKCWSJZXATFLBIMDREPVUQ

// SORTED PREREQUISITES
// GONCJHWSXKTFZALBYMDIREPVUQ

// GWTNJOCFHKSMXLZABYDIREPVUQ

// GNJOCHKSWTFMXLYDZABIREPVUQ