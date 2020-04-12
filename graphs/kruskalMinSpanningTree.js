class Graph {
    constructor(verticesNum) {
        this.numOfVertices = verticesNum || 0;
        this.adjacentList = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacentList.push({vertex1, vertex2, weight});
    }

    union(vertex1, vertex2, repMap) {
        const vertex1Rep = this.find(vertex1, repMap);
        const vertex2Rep = this.find(vertex2, repMap);
        vertex1Rep <= vertex2Rep ? repMap[vertex1Rep] = vertex2Rep : repMap[vertex2Rep] = vertex1Rep;
    }

    find(vertex, repMap) {
        if(vertex === repMap[vertex]) {
            return vertex;
        }
        return this.find(repMap[vertex], repMap);
    }

    kruskalMinSpanTree() {
        const repMap = {};
        let i = 0;
        let numOfedges = 0;
        const results = [];

        for(let i = 1; i <= this.numOfVertices; i++) {
            repMap[i] = i
        }
        const sortedEdges = this.adjacentList.sort((a,b)=> a.weight - b.weight);

        while(numOfedges < this.numOfVertices - 1) {
            const {vertex1, vertex2, weight} = sortedEdges[i];
            i++;
            const firstEdge = this.find(vertex1,repMap);
            const secondEdge = this.find(vertex2,repMap);

            if(firstEdge !== secondEdge) {
                numOfedges++;
                results.push({vertex1, vertex2, weight});
                this.union(firstEdge, secondEdge, repMap);
            }
        }
        return results;
    }
}
const graph = new Graph(6);
graph.addEdge(1,2,9);
graph.addEdge(2,3,8);
graph.addEdge(2,4,2);
graph.addEdge(3,4,2);
graph.addEdge(3,5,3);
graph.addEdge(4,6,2);
graph.addEdge(5,6,1);
graph.kruskalMinSpanTree();
