class Graph {
    constructor() {
        this.adjacencyList = {};
        this.visitedNodes = {};
        this.visitedSeq = [];
        this.queue = [];
        this.helperSTPtable = {};
        this.nodes = [];
        this.cycleNumber = 0;
        this.allCycles = {};
    }

    addVertex(value) {
        if (this.adjacencyList[value]) {
            console.log(`${value} vertex already exists`);
            return this;
        }
        this.nodes.push(value);
        this.adjacencyList[value] = [];
        return this;
    }

    addEdge(valueOne, valueTwo, weight= 0) {
        if (!this.adjacencyList[valueOne]) {
            console.log(`${valueOne} vertex does not exists`);
            return this;
        }
        if (!this.adjacencyList[valueTwo]) {
            console.log(`${valueTwo} vertex does not exists`);
            return this;
        }
        if (this.adjacencyList[valueOne].indexOf(valueTwo) === -1) {
            this.adjacencyList[valueOne].push({node: valueTwo, weight});
            this.adjacencyList[valueTwo].push({node: valueOne, weight});
            return this;

        }
    }

    removingEdge(valueOne, valueTwo) {
        this.adjacencyList[valueOne] = this.adjacencyList[valueOne].filter(edge => edge.node !== valueTwo);
        this.adjacencyList[valueTwo] = this.adjacencyList[valueTwo].filter(edge => edge.node !== valueOne);
    }

    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            console.log(`${vertex} no such vertex`);
            return this;
        }
        this.adjacencyList[vertex].forEach(edge => {
            this.removingEdge(vertex, edge.node);
        });

        delete this.adjacencyList[vertex];
    }

    dfsTraversal(vertex) {
        this.visitedNodes[vertex] = true;
        this.visitedSeq.push(vertex);
        const siblings = this.adjacencyList[vertex];

        for (let sibling of siblings) {
            if (!this.visitedNodes[sibling.node]) {
                this.dfsTraversal(sibling.node);
            }
        }
    }

    bfsTraversal(vertex) {
        this.queue.push(vertex);
        this.visitedNodes[vertex] = true;

        while(this.queue.length) {
            let currentV = this.queue.shift();
            this.visitedSeq.push(currentV);

            this.adjacencyList[currentV].forEach(v => {
                if(!this.visitedNodes[v.node]) {
                    this.queue.push(v.node);
                    this.visitedNodes[v.node] = true
                }
            })
        }
    }

    dijkstraSTP(srcNode) {
        const visitedNodes = [];
        const unvisitedNodes = [...this.nodes];

        this.helperSTPtable[srcNode] = {distance: 0 ,previousNode: NaN};
        let visitedNode = unvisitedNodes.splice(unvisitedNodes.indexOf(srcNode),1)[0];
        visitedNodes.push(visitedNode);

        let currentNode = srcNode;
        let currentVertex = this.adjacencyList[currentNode];

        while(unvisitedNodes.length > 0) {
            let shortestPath;
            for(let edge of currentVertex) {
                if (visitedNodes.indexOf(edge.node) === -1) {
                    let edgeDistance = edge.weight + this.helperSTPtable[currentNode].distance;
                    if (this.helperSTPtable[edge.node]) {
                        if (edgeDistance < this.helperSTPtable[edge.node].distance) {
                            this.helperSTPtable[edge.node].distance = edgeDistance;
                            this.helperSTPtable[edge.node].previousNode = currentNode;
                        }
                    } else {
                        this.helperSTPtable[edge.node] = {distance: edgeDistance, previousNode: currentNode};
                    }
                }
            }

               for(let key in this.helperSTPtable) {
                   let vertex = this.helperSTPtable[key];
                   let distance = vertex.distance;
                   if(visitedNodes.indexOf(key) === -1) {
                       if(shortestPath) {
                           shortestPath = distance < this.helperSTPtable[shortestPath].distance ? key : shortestPath;
                       } else {
                           shortestPath = key
                       }
                   }
               }
                visitedNode = unvisitedNodes.splice(unvisitedNodes.indexOf(shortestPath),1)[0];
                visitedNodes.push(visitedNode);

            currentVertex = this.adjacencyList[visitedNode];
            currentNode = visitedNode;
        }

    }

    findCycles(v, parent, colors, mark, parents) {
        if(colors[v] === 2) {
            return;
        };

        if(colors[v] === 1) {
            this.allCycles[this.cycleNumber] = [];
            let current = parent;
            this.allCycles[this.cycleNumber].push(current);

            while(v !== current) {
                current = parents[current];
                this.allCycles[this.cycleNumber].push(current);
            }
            this.cycleNumber++;
            return;
        }

        parents[v] = parent;
        colors[v] = 1;

        for(let vertex of this.adjacencyList[v]) {
            const node = vertex.node;
            if(node === parents[v]) {
                continue;
            }
            this.findCycles(node, v, colors, mark, parents);
        }

        colors[v] = 2;
    }

    findAllCycles() {
        for(let vertex in this.adjacencyList) {
            this.findCycles(vertex,null,{},{},{});
        }
    }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");


graph.addEdge('A','B');
graph.addEdge('A','F');
graph.addEdge('B','C');
graph.addEdge('C','D');
graph.addEdge('C','F');
graph.addEdge('D','E');
graph.addEdge('E','F');
graph.findAllCycles();
console.log(graph.allCycles);
