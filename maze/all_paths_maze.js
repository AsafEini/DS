const matrix = [
    [1,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,1,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,0,1],
    [1,0,1,0,1,0,1,0,0,1],
    [1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,1,1,0,0,0,0,1,0,1],
    [0,0,1,0,0,0,0,1,0,1],
    [0,0,1,1,1,1,1,1,1,1]
];

class Position{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Maze {
    constructor(maze) {
        this.maze = maze;
        this.maxX = maze[0].length - 1;
        this.maxY = maze.length - 1;
        this.DIRECTIONS = {UP:'U', DOWNS:'D', LEFT:'L', RIGHT:'R'};
        this.allPaths = [];
        this.visitedMatrix = this.generateVisitedMatrix(this.maxX, this.maxY);

    }
    getAllPaths() {
        return this.allPaths;
    }

    generateVisitedMatrix(xMax,yMax) {
        const arr = [];
        for(let i = 0; i <= xMax; i++) {
            const xx = Array(yMax + 1).fill(false);
            arr.push(xx)
        }
        return arr;
    }

    isPositionValid(position) {
        return !!(
            position.x <= this.maxX &&
            position.x >= 0 &&
            position.y <= this.maxY &&
            position.y >= 0 &&
            this.maze[position.y][position.x] === 1  &&
            !this.visitedMatrix[position.y][position.x]);
    }


    findAllPaths(maze, dest, position = new Position(0,0), results) {

        if(dest.x === position.x && dest.y === position.y) {
            this.allPaths.push([...results]);
            return true
        }

        let pos;

        //down
        pos = new Position(position.x, position.y + 1);
        if(this.isPositionValid(pos)) {
            results.push(this.DIRECTIONS.DOWNS);
            this.visitedMatrix[position.y][position.x] = true;
            this.findAllPaths(maze, dest, pos, results);
            results.pop();
            this.visitedMatrix[position.y][position.x] = false;
        }
        //left
        pos = new Position(position.x + 1, position.y);
        if(this.isPositionValid(pos)) {
            results.push(this.DIRECTIONS.LEFT);
            this.visitedMatrix[position.y][position.x] = true;
            this.findAllPaths(maze, dest, pos, results);
            results.pop();
            this.visitedMatrix[position.y][position.x] = false;
        }

        //right
        pos = new Position(position.x - 1, position.y);
        if(this.isPositionValid(pos)) {
            results.push(this.DIRECTIONS.RIGHT);
            this.visitedMatrix[position.y][position.x] = true;
            this.findAllPaths(maze, dest, pos, results);
            results.pop();
            this.visitedMatrix[position.y][position.x] = false;
        }

        //up
        pos = new Position(position.x, position.y - 1);
        if(this.isPositionValid(pos)) {
            results.push(this.DIRECTIONS.UP);
            this.visitedMatrix[position.y][position.x] = true;
            this.findAllPaths(maze, dest, pos, results);
            results.pop();
            this.visitedMatrix[position.y][position.x] = false;
        }
        return false;
    }
}

const maze = new Maze(matrix);

maze.findAllPaths(matrix, new Position(9,9), new Position(0,0), []);
console.log(maze.getAllPaths());
