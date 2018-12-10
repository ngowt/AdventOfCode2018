const fs = require('fs');
let input = "input.txt";

let circle = [];

let currentPlayer = 1;
let turn = 0;
let totalPlayers = 463;
let lastTurn = 71787;
let scores = {};
let highscore = 0;

class Node {
    constructor(number) {
        this.number = number;

        //Clock-wise
        this.next; 
        
        //Counter-clockwise
        this.previous; 
    }
}

for (let i = turn; turn < lastTurn; turn++) {
    insertMarble(turn);
    setNextPlayer();
}

for (let player in scores) {
    if (scores[player] > highscore)
        highscore = scores[player];
}
console.log(highscore);

function setNextPlayer() {
    if (currentPlayer === totalPlayers) {
        currentPlayer = 1;
    } else {
        currentPlayer++;
    }
}

function addScore(points) {
    if (!scores[currentPlayer])
        scores[currentPlayer] = 0;
    scores[currentPlayer] += points;
}

function removeMarble() {
    let backtrackedNode = currentNode;
    for (let i = 0; i < 7; i++) {
        backtrackedNode = backtrackedNode.previous;
    }
    let previousNode = backtrackedNode.previous;
    let nextNode = backtrackedNode.next;
    previousNode.next = nextNode;
    nextNode.previous = previousNode;
    addScore(backtrackedNode.number);
    currentNode = nextNode;
}

function insertMarble(turn) {
    if (circle.length != 0) {
        if (turn % 23 == 0) {
            addScore(turn);
            removeMarble();
        } else {
            let node = new Node(turn);
            let nextNextNode = currentNode.next.next;
            let nextNode = currentNode.next;
            nextNode.next = node;
            nextNextNode.previous = node;
            node.next = nextNextNode;
            node.previous = nextNode;
            currentNode = node;
        }
    } else {
        let node = new Node(turn);
        node.next = node;
        node.previous = node;
        circle.push(node);
        currentNode = node;
    }
}