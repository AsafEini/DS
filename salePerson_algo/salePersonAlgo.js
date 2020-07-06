class Graph {
    constructor() {
        this.nodes = [];
        this.weightMatrix = [
            [0,5,2,1],
            [2,0,3,3],
            [3,5,0,1],
            [8,2,5,0]
        ]
    }

    addNode(node) {
        this.nodes.push(node);
    }
}

const graph = new Graph();
graph.addNode([1,2,3])
graph.addNode([0,2,3])
graph.addNode([0,1,3])
graph.addNode([0,1,2])

function salesPersonAlgorithm(graph, startingNodeIndex) {
    const nodes = graph.nodes;
    const weightMatrix = graph.weightMatrix;
    const visited = {[startingNodeIndex]: true};
    const finalAnswer = minimumWeightCalc(nodes, startingNodeIndex, weightMatrix, visited);
    return finalAnswer;
}


function minimumWeightCalc(nodes, index, matrix, visited) {
    let partial;
    visited[index] = true;
    const unVisited = nodes[index].filter(node => !visited[node]);
    const answersArray = [];
    if(unVisited.length === 1) {
        partial = matrix[index][unVisited[0]];
        let remains = matrix[unVisited[0]][0];
        return partial + remains;
    }
    for(let node of unVisited) {
        partial = matrix[index][node];
        const ans = partial + minimumWeightCalc(nodes, node, matrix, visited);
        answersArray.push(ans);
        visited[node] = false;
    }
    return min(answersArray);
}

function min(numbers) {
    let minValue = null;
    for(let num of numbers) {
        if(minValue === null) {
            minValue = num;
        } else {
            if(minValue > num) {
                minValue = num;
            }
        }
    }
    return minValue;
}

console.log(salesPersonAlgorithm(graph,0))
