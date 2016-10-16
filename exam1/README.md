# Midterm Take-Home Exam
###### [SirSeim](https://twitter.com/sirseim) / 2016-10-16

1.  _Draw the graph representation for the farmer, wolf, goat, and cabbage problem:_

    > farmer with his wolf, goat, and cabbage come to the edge of a river they wish to cross. There is a boat at the river’s edge, but, of course, only the farmer can row. The boat also can carry only two things (including the rower) at a time. If the wolf is ever left alone with the goat, the wolf will eat the goat; similarly, if the goat is left alone with the cabbage, the goat will eat the cabbage. Devise a sequence of crossings of the river so that all four characters arrive safely on the other side of the river.

    _Let nodes represent states of the world; e.g., the farmer and the goat are on the west bank and the wolf and cabbage on the east. Show your solution using first breadth-first search and next your solution using depth-first search. Discuss the advantages and disadvantages of breadth-first and depth-first search for this particular problem._

    state | left | right
    --- | --- | ---
    1 (Start) | WGCF | 
    2 | WC | GF
    3 | WGF | C
    4 | W | GCF
    5 | WCF | G
    6 | C | WGF
    7 | GCF | W
    8 | G | WCF
    9 | GF | WC
    10 (Goal) |  | WGCF

    ###### Graph
    ![Graph](https://cdn.rawgit.com/sirseim/cmsi485/master/exam1/diagram1.svg)

    ###### Depth-First Search
    ![Graph](https://cdn.rawgit.com/sirseim/cmsi485/master/exam1/diagram2.svg)

    ###### Bredth-First Search
    ![Graph](https://cdn.rawgit.com/sirseim/cmsi485/master/exam1/diagram3.svg)

    Bredth-First Search _sucks_. **PERIOD** _EOL_

2.  _Write a pseudo-code program that will take as input two Web page URLs and find a path of links from one to the other. What is an appropriate search strategy? Is bidirectional search a good idea? Could a search engine be used to implement a predecessor function?_

  
    ```javascript
    var start = "www.lmu.edu";
    var end = "www.graduate.lmu.edu";

    var depth = function (graph, goal, level) {
        var a = [graph.start];
        var traversed = [];
        while (a.length > 0) {
            var local = a.pop();
            for (var i = 0; i < local.side.length; i++) {
                if ((!isThere(a, local.side[i].node.name)) &&
                        (!isThere(traversed, local.side[i].node.name)) &&
                        isWithinLevel(local, level)) {
                    a.push(local.side[i].node);
                }
            }
            if (local.name === "G") {
                return traversed;
            }
            traversed.push(local);
        }
        return null;
    };

    var dfid = function (graph, goal, level=0) {
        var list = depth(graph, goal, level);
        if (list) {
            return list;
        }
        return dfid(graph, goal, level + 1);
    };

    var search = function (start, end) {
        var graph = google.makeTree(start);
        return dfid(graph, end);
    };

    ```

    I believe Depth-First Iterative Deepening is the appropriate method to sue because depth-first is not going to be constrained with a whole internet of information that it could end up trying to traverse without getting anywhere close to the goal. It will still be memory efficient compared to breadth-first which will end up storing a lot of unnecessary paths and nodes. 

3.  _Explain why Depth-First Search Iterative Deepening is reasonably efficient. Why might it be preferable to use DFID rather than depth-first search?_

    Depth-First Iterative Deepening (DFID) is a search method that tries to bring together the best of breadth-first and depth-first search. It works by repeatedly performing depth-first searches. What constrains each iteration is the depth of the search allowed. The depth of the search is how far away from the start node a particular node is. It gets its efficiency from its depth-first utilization, without running infinity down a path away from the goal. Becuase of its utilization of depth-first search, its also quite memory efficient.

4.  _Bidirectional search must be able to determine when the frontiers intersect. For each of the following pairs of searches specify how to determine when the frontiers intersect:_
    1.  _Breadth-first search and depth-bounded depth-first search._
    2.  _Iterative deepening search and depth-bounded depth-first search._
    3.  _A* and depth-bounded depth-bounded search._
    4.  _A* and A*_