class BinaryHeap {
    constructor() {
        this.cases = [];
    }

    swap(indexOne, indexTwo) {
        let temp = this.cases[indexTwo];
        this.cases[indexTwo] = this.cases[indexOne];
        this.cases[indexOne] = temp;
    }

    enqueue(priority, value) {
        this.cases.push(new Node(priority, value));
        let valueIndex = this.cases.length - 1;

        while(true) {
            let parentIndex = Math.floor(( (valueIndex - 1) / 2 )) <= 0 ? 0 : Math.floor(( (valueIndex - 1) / 2 ));

            if(this.cases[parentIndex].priority > priority) {
                this.swap(valueIndex, parentIndex);
                valueIndex = parentIndex;
            } else {
                break;
            }

        }
    }

    dequeue() {
        if(!this.cases.length) {
            console.log('heap is empty')
        }

        this.cases[0] = this.cases[this.cases.length - 1];
        this.cases.pop();
        let index = 0;

        while(true) {
            let leftChildIndex = (index * 2) + 1;
            let rightChildIndex = (index * 2) + 2;
            let leftChild = this.cases[leftChildIndex];
            let rightChild = this.cases[rightChildIndex];

            if(!leftChild) {
                break;
            }

            if(!rightChild) {
                if(leftChild && leftChild.priority < this.cases[index].priority) {
                    this.swap(index, leftChildIndex);
                    index = leftChildIndex;
                } else {
                    break;
                }
            }
            let nodeToCompareIndex = leftChild.priority < rightChild.priority ? leftChildIndex : rightChildIndex;

            if(this.cases[nodeToCompareIndex].priority < this.cases[index].priority) {
                this.swap(index, nodeToCompareIndex);
                index = nodeToCompareIndex;
            } else {
                break;
            }

        }


    }
}

class Node {
    constructor(priority, val) {
        this.priority = priority;
        this.value = val;
    }
}

const BH = new BinaryHeap();
BH.enqueue(4,'kaki');
BH.enqueue(2,'head');
BH.enqueue(1,'shiiittt');
BH.enqueue(6,'nothing special');
BH.enqueue(5,'gay');
BH.enqueue(2,'head');
BH.enqueue(3,'very not funny');
BH.enqueue(7,'lol');
BH.enqueue(1,'shiiittt');





console.log(BH.cases);
