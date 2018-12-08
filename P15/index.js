const fs = require('fs');
let input = "input.txt";

class Node {
    constructor(numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
        this.numberOfMetadata;
        this.children = [];
        this.metadataEntries = [];
    }
}

let stack = [];
let trees = [];
let result;
let i = 0;
let metaDataSum = 0;

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    result = data.split(' ');
    generateNodes();
    
    for (let i = 0; i < stack.length; i++) {
        trees.push(stack.pop());
    }

    for (let key in trees) {
        for (let i = 0; i < trees[key].metadataEntries.length; i++) {
            metaDataSum += parseInt(trees[key].metadataEntries[i]);
        }
    }
    console.log(metaDataSum);
    return metaDataSum;
});

function generateNodes(numChildren, numMetadata) {
    let numberOfChildren = numChildren;
    let numberOfMetadata = numMetadata;
        
    for (i; i < result.length; i++) {
        if (numberOfChildren === undefined) {
            numberOfChildren = result[i];
            stack.push(new Node(numberOfChildren));
        } else if (numberOfMetadata === undefined) {
            numberOfMetadata = result[i];
            stack[stack.length-1].numberOfMetadata = numberOfMetadata;
        } else if (stack[stack.length-1].children.length != stack[stack.length-1].numberOfChildren) {
            generateNodes();
        } else if (stack[stack.length-1].metadataEntries.length != stack[stack.length-1].numberOfMetadata) {
            stack[stack.length-1].metadataEntries.push((result[i]));
        } else if (stack.length > 1) {
            let childNode = stack.pop();
            trees.push(childNode);
            stack[stack.length-1].children.push(childNode);
            if (stack[stack.length-1].metadataEntries.length != stack[stack.length-1].numberOfMetadata) {
                generateNodes(stack[stack.length-1].numberOfChildren, stack[stack.length-1].numberOfMetadata);
            }
        }
    }
}