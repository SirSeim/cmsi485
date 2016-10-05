var S = {
    name: "S"
};
var A = {
    name: "A"
};
var B = {
    name: "B"
};
var C = {
    name: "C"
};
var D = {
    name: "D"
};
var E = {
    name: "E"
};
var F = {
    name: "F"
};
var G = {
    name: "G"
};

S.side = [
    {
        cost: 3,
        node: A
    },
    {
        cost: 4,
        node: D
    }
];

A.side = [
    {
        cost: 3,
        node: S
    },
    {
        cost: 5,
        node: D
    },
    {
        cost: 8,
        node: F
    }
];

B.side = [
    {
        cost: 4,
        node: C
    },
    {
        cost: 5,
        node: E
    }
];

C.side = [
    {
        cost: 4,
        node: B
    },
    {
        cost: 5,
        node: F
    },
    {
        cost: 14,
        node: G
    }
];

D.side = [
    {
        cost: 4,
        node: S
    },
    {
        cost: 5,
        node: A
    },
    {
        cost: 2,
        node: E
    }
];

E.side = [
    {
        cost: 5,
        node: B
    },
    {
        cost: 2,
        node: D
    },
    {
        cost: 4,
        node: F
    }
];

F.side = [
    {
        cost: 5,
        node: C
    },
    {
        cost: 4,
        node: E
    },
    {
        cost: 8,
        node: A
    }
];

G.side = [
    {
        cost: 14,
        node: C
    }
];

var isThere = function (array, str) {
    var result = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === str) {
            result = true;
        }
    }
    return result;
};

var printIt = function (arr) {
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        str += arr[i].name;
    }
    console.log(str);
};

var breadth = function (start) {
    var a = [start];
    var traversed = [];
    while (a.length > 0) {
        var local = a.pop();
        for (var i = 0; i < local.side.length; i++) {
            if ((!isThere(a, local.side[i].node.name)) && (!isThere(traversed, local.side[i].node.name))) {
                a.unshift(local.side[i].node);
            }
        }
        if (local.name === "G") {
            printIt(traversed);
            return console.log(local.name);
        }
        traversed.push(local);
    }
};

var depth = function (start) {
    var a = [start];
    var traversed = [];
    while (a.length > 0) {
        var local = a.pop();
        for (var i = 0; i < local.side.length; i++) {
            if ((!isThere(a, local.side[i].node.name)) && (!isThere(traversed, local.side[i].node.name))) {
                a.push(local.side[i].node);
            }
        }
        if (local.name === "G") {
            printIt(traversed);
            return console.log(local.name);
        }
        traversed.push(local);
    }
};

var hue = function (node) {
    var list = {
        S: 11.0,
        A: 10.4,
        B: 6.7,
        C: 4.0,
        D: 8.9,
        E: 6.9,
        F: 3.0,
        G: 0.0
    };
    return list[node.name];
};

var best = function (start, heuristic) {
    var a = [start];
    var traversed = [];
    while (a.length > 0) {
        var local = a.pop();
        if (local.name === "G") {
            printIt(traversed);
            return console.log(local.name);
        }
        var best = {};
        for (var i = 0; i < local.side.length; i++) {
            if ((!isThere(traversed, local.side[i].node.name)) && (((best && best.cost) || 1000) > heuristic(local.side[i].node))) {
                best = {
                    cost: heuristic(local.side[i].node),
                    node: local.side[i].node
                }
            }
        }
        a.unshift(best.node);
        traversed.push(local);
    }
};

console.log("breadth");
breadth(S);
console.log("---");

console.log("depth");
depth(S);
console.log("---");

console.log("best");
best(S, hue);
