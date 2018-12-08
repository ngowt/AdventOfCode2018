const fs = require('fs');
let input = "input.txt";

let totalDuration = 0;
let alphabet = "";
let nodeTimes = {};
let numberOfElves = 5;
for (let i = 0; i < 26; i++) {
    nodeTimes[(alphabet+(i+10).toString(36)).toUpperCase()] = 60+i+1;
}

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.prerequisites = [];
        this.isExecuted = false;
        this.duration = nodeTimes[value];
    }
}

let dict = {};
let executionStack = [];
let options = [];
let executionQueue = [];

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
    addToQueue(options);

    console.log(executionQueue, options, totalDuration);
    while (executionQueue.length > 0) {
        let shortestDuration = getShortestDuration();
        let shortestNode = getShortestNode();
        elapseTime(shortestDuration);
        console.log(executionQueue, options, shortestNode.value, totalDuration);
    }

    let output = "";
    for (let key in executionStack) {
        output = output.concat(executionStack[key]);
    }
    console.log(output, totalDuration);
});

function getShortestDuration() {
    let shortestDuration;
    for (let key in executionQueue) {
        if (!shortestDuration || dict[executionQueue[key]].duration < shortestDuration) {
            shortestDuration = dict[executionQueue[key]].duration;
        }
    }
    return shortestDuration;
}

function elapseTime(shortestDuration) {
    totalDuration += shortestDuration;
    let splicedKeys = [];
    for (let key in executionQueue) {
        dict[executionQueue[key]].duration -= shortestDuration;
        if (dict[executionQueue[key]].duration === 0) {
            dict[executionQueue[key]].isExecuted = true;
            executionStack.push(executionQueue[key]);
            addOptions(executionQueue[key]);
            splicedKeys.push(executionQueue[key]);
        }
    }
    for (let el in splicedKeys) {
        executionQueue.splice(executionQueue.indexOf(splicedKeys[el]), 1);
    }
    addToQueue(options.sort());
    
}

function addOptions(node) {
    dict[node].children.map( el => {
        if (options.indexOf(el) === -1 && !dict[el].isExecuted && executionQueue.indexOf(el) === -1) 
            options.push(el);
    });
}

function getShortestNode() {
    let shortestNode;
    let duration;
    for (let key in executionQueue) {
        if (!duration || dict[executionQueue[key]].duration < duration) {
            duration = dict[executionQueue[key]].duration;
            shortestNode = dict[executionQueue[key]];
        }
    }
    return shortestNode;
}

function addToQueue(options) {
    let splicedKeys = [];
    for (let i = 0; i < options.length; i++) {
        if (executionQueue.length < numberOfElves) {
            if (isAbletoExecute(dict[options[i]])) {
                executionQueue = executionQueue.concat(options[i]);
                splicedKeys.push(options[i]);
            } 
        }
    }
    for (let key in splicedKeys) {
        options.splice(options.indexOf(splicedKeys[key]), 1);
    }
    executionQueue.sort();
}

function isAbletoExecute(node) {
    if (node.isExecuted)
        return false;

    for (let i = 0; i < node.prerequisites.length; i++) {
        if (!dict[node.prerequisites[i]].isExecuted)
            return false;
    }
    return true;
}