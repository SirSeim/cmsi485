//Peyton Cross
//Homework 1
//CMSI 485
//Making the net as a tree representation. Didn't feel like condensing it into one tree variable.
var nodeG = {
    value: 'G',
    left: null,
    right: null,
    distance: 0.0
}

var nodeC = {
    value: 'C',
    left: nodeG,
    right: null,
    distance: 4.0
}

var nodeB = {
    value: 'B',
    left: nodeC,
    right: null,
    distance: 4.0
}

var nodeF = {
    value: 'F',
    left: nodeC,
    right: null,
    distance: 3.0
}

var nodeE = {
    value: 'E',
    left: nodeB,
    right: nodeF,
    distance: 6.9
}

var nodeD = {
    value: 'D',
    left: nodeE,
    right: null,
    distance: 8.9
}

var nodeA = {
    value: 'A',
    left: nodeF,
    right: null,
    distance: 10.4
}

var nodeS = {
    value: 'S',
    left: nodeA,
    right: nodeD,
    distance: 11.0
}

var depthFirst = function(startNode) {
    var visitedNodes = []
    var frontierStack = []
    var currentNode = startNode;
    visitedNodes.push(startNode);
    frontierStack.push(startNode);

    while (frontierStack.length !== 0) {
        //To the left
        if (currentNode.left !== null && visitedNodes.indexOf(currentNode.left) === -1) {
            currentNode = currentNode.left;
            visitedNodes.push(currentNode);
            frontierStack.push(currentNode);
            continue
        }

        //Checks the goal
        if (currentNode.value === "G") {
            return frontierStack
        }

        //To the right
        if (currentNode.right !== null && visitedNodes.indexOf(currentNode.right) === -1) {
            currentNode = currentNode.right;
            visitedNodes.push(currentNode);
            frontierStack.push(currentNode);
            continue
        }
        //Reached a dead end
        frontierStack.pop();
        currentNode = frontierStack[frontierStack.length - 1]
    }
    return [{
        value: "Goal does not exist"
    }]
}
console.log("Depth Search");
depthFirst(nodeS).forEach(function(node) {
    process.stdout.write(node.value + " ")
});
console.log();

var breadthFirst = function(startNode) {
    var visitedNodes = [];
    var frontierQueue = [];
    var paths = [];
    var currentPath = [startNode];
    frontierQueue.push(currentPath);
    while (frontierQueue.length !== 0) {
        currentPath = frontierQueue.shift();
        if (currentPath[currentPath.length - 1].value === "G") {
            return currentPath;
        }
        //Add left nodes
        if (currentPath[currentPath.length - 1].left !== null && visitedNodes.indexOf(currentPath[currentPath.length - 1].left) === -1) {
            var copyPath = currentPath.slice()
            copyPath.push(currentPath[currentPath.length - 1].left)
            frontierQueue.push(copyPath);
            visitedNodes.push(currentPath[currentPath.length - 1].left);
        }
        //Add right nodes
        if (currentPath[currentPath.length - 1].right !== null && visitedNodes.indexOf(currentPath[currentPath.length - 1].right) === -1) {
            var copyPath = currentPath.slice()
            copyPath.push(currentPath[currentPath.length - 1].right)
            frontierQueue.push(copyPath);
            visitedNodes.push(currentPath[currentPath.length - 1].right);
        }
    }
    return [{
        value: "Goal does not exist"
    }]

}
console.log("Breadth Search")
breadthFirst(nodeS).forEach(function(node) {
    process.stdout.write(node.value + " ")
});
console.log();

var bestSearch = function(startNode) {
    var visitedNodes = []
    var frontierStack = []
    var currentNode = startNode;
    visitedNodes.push(startNode);
    frontierStack.push(startNode);
    while (frontierStack.length !== 0) {
        //found the solution
        if (currentNode.value === "G") {
            return frontierStack
        }
        //Goes left if the distance is closer to the left node else goes to the right. Like above ignores nodes it has already visited.
        if (currentNode.right === null || currentNode.left.distance < currentNode.right.distance && visitedNodes.indexOf(currentNode.left) === -1) {
            currentNode = currentNode.left;
            visitedNodes.push(currentNode);
            frontierStack.push(currentNode);
            continue
        } else if (visitedNodes.indexOf(currentNode.right) === -1) {
            currentNode = currentNode.right;
            visitedNodes.push(currentNode);
            frontierStack.push(currentNode);
            continue
        }
        //reached a dead end
        frontierStack.pop();
        currentNode = frontierStack[frontierStack.length - 1]
    }
    // no solution exists
    return [{
        value: "Goal does not exist"
    }]
}
console.log("Best Search")
bestSearch(nodeS).forEach(function(node) {
    process.stdout.write(node.value + " ")
});
console.log();

var beamSearch = function(startNode, size) {
    var visitedNodes = [];
    var frontierQueue = [];
    var paths = [];
    var currentPath = [startNode];
    frontierQueue.push(currentPath);
    var counter = 0;
    while (frontierQueue.length !== 0) {
        counter++
        //Selects and remove the best path from the frontier
        var cmpNum = frontierQueue[0][frontierQueue[0].length - 1].distance
        var pathNum = 0
        frontierQueue.forEach(function(path) {
            if (path[path.length - 1].distance < cmpNum) {
                cmpNum = path[path.length - 1].distance
                pathNum++
                currentPath = path
            }
        })

        frontierQueue.splice(pathNum, 1)

        //We found the goal
        if (currentPath[currentPath.length - 1].value === "G") {
            return currentPath;
        }
        //Adds left path if size of the Queue is not full and left is not null
        if (currentPath[currentPath.length - 1].left !== null && visitedNodes.indexOf(currentPath[currentPath.length - 1].left) === -1 && frontierQueue.length < size) {
            var copyPath = currentPath.slice()
            copyPath.push(currentPath[currentPath.length - 1].left)
            frontierQueue.push(copyPath);
            visitedNodes.push(currentPath[currentPath.length - 1].left);
        }
        //Adds right path if size of the Queue is not full and right is not null
        if (currentPath[currentPath.length - 1].right !== null && visitedNodes.indexOf(currentPath[currentPath.length - 1].right) === -1 && frontierQueue.length < size) {
            var copyPath = currentPath.slice()
            copyPath.push(currentPath[currentPath.length - 1].right)
            frontierQueue.push(copyPath);
            visitedNodes.push(currentPath[currentPath.length - 1].right);
        }
    }
    // no solution exists
    return [{
        value: "Goal does not exist"
    }]
}
console.log("Beam Search")
beamSearch(nodeS, 2).forEach(function(node) {
    process.stdout.write(node.value + " ")
});
console.log();