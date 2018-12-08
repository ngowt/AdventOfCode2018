const fs = require('fs');
let input = "input.txt";

class Node {
    constructor(numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
        this.numberOfMetadata;
        this.children = [];
        this.metadataEntries = [];
        this.metaDataValue;
    }
}

let stack = [];
let trees = [];
let result;
let i = 0;

fs.readFile(input, 'utf8', function(err, data) {
    if (err) throw err;
    result = data.split(' ');
    generateNodes();

    for (let key in trees) {
        for (let i = 0; i < trees[key].metadataEntries.length; i++) {
            metaDataSum += parseInt(trees[key].metadataEntries[i]);
        }
    }
    console.log(getRootMetaDataValues(stack[0]));
    return getRootMetaDataValues(stack[0]);
});

function getRootMetaDataValues(root) {
    let metaDataValue = 0;
    for (let i = 0; i < root.metadataEntries.length; i++) {
        if (root.children[root.metadataEntries[i] - 1])
        metaDataValue += root.children[root.metadataEntries[i] - 1].metaDataValue;
    }
    return metaDataValue;
}

function getNodeMetaDataValue(node) {
    let metadataValue = 0;
    if (node.children.length == 0) {
        for (let i = 0; i < node.metadataEntries.length; i++) {
            metadataValue += parseInt(node.metadataEntries[i]);
        }
        return metadataValue;
    } else {
        for (let i = 0; i < node.metadataEntries.length; i++) {
            if (node.children[node.metadataEntries[i] - 1]) {
                metadataValue += node.children[node.metadataEntries[i]-1].metaDataValue != undefined ? parseInt(node.children[node.metadataEntries[i]-1].metaDataValue) : parseInt(getNodeMetaDataValue(node.children[node.metadataEntries[i]-1]));
            }
        }
        return metadataValue;
    }
}

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
            childNode.metaDataValue = getNodeMetaDataValue(childNode);
            trees.push(childNode);
            stack[stack.length-1].children.push(childNode);
            if (stack[stack.length-1].metadataEntries.length != stack[stack.length-1].numberOfMetadata) {
                generateNodes(stack[stack.length-1].numberOfChildren, stack[stack.length-1].numberOfMetadata);
            }
        }
    }
}