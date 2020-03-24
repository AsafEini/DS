class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        } else {
            node.previous = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
    }

    pop() {
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length--;
            return;
        }
        if (!this.length) {
            console.log("list is empty");
            return;
        }

        let newTail = this.tail.previous;
        newTail.next = null;
        this.tail = newTail;
        this.length--;
    }

    shift() {
        if (!this.head) {
            console.log("List is empty");
            return;
        }
        if (this.head.next) {
            let newHead = this.head.next;
            newHead.previous = null;
            this.head = newHead;
            this.length--;
        } else {
            this.head = null;
            this.tail = null;
            this.length--;
        }
    }

    unshift(value) {
        let node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        let currentHead = this.head;
        currentHead.previous = node;
        node.next = currentHead;
        this.head = node;
        this.length++;
    }

    get(index) {
        if (index > this.length - 1 || index < 0) {
            console.log("not exists");
            return;
        }

        let num = 0;
        let currentNode = this.head;

        while (index !== num) {
            num++;
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    set(index, value) {
        const node = this.get(index);
        if (node) {
            node.value = value;
        } else {
            console.log('no such node')
        }
    }

    insert(index, value) {
        if (index > this.length - 1 || index < 0) {
            console.log("not exists");
            return;
        }
        if (index === this.length - 1) {
            this.push(value);
            return;
        }
        if (index === 0) {
            this.unshift(value);
            return;
        }

        const newNode = new Node(value);
        const currentNode = this.get(index);
        const previousNode = currentNode.previous;
        newNode.next = currentNode;
        newNode.previous = previousNode;
        currentNode.previous = newNode;
        previousNode.next = newNode;
        this.length++;

    }

    remove(index) {
        if (index > this.length - 1 || index < 0) {
            console.log("not exists");
            return;
        }
        if (index === this.length - 1) {
            this.pop();
            return;
        }
        if (index === 0) {
            this.shift();
            return;
        }
        const removedNode = this.get(index);
        const nextNode = removedNode.next;
        const previousNode = removedNode.previous;
        nextNode.previous = previousNode;
        previousNode.next = nextNode;
        this.length--;

    }

    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        let currentNode = this.head;
        for (let i = 0; i < this.length; i++) {
            const previous = currentNode.next;
            const next = currentNode.previous;
            currentNode.next = next;
            currentNode.previous = previous;
            currentNode = currentNode.next
        }
    }

    loop() {
        let currentNode = this.head;
        for (let i = 0; i < this.length; i++) {
            console.log(currentNode);
            currentNode = currentNode.next
        }
    }

    reverseForSingle() {
        let prev;
        let curr = this.head;
        let next;
        while(curr) {
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
            this.head = prev;
        }
    }
}


class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }
}

const list = new LinkedList();
list.push(6);
list.push(7);
list.push(16);
list.push(17);
list.reverseForSingle();
console.log(list);
