class BinarySearchTree {

    constructor() {
        this.rootNode = null;
        this.queue = [];
        this.results = [];
    }
    addTreeNode(value) {
        const treeNode = new TreeNode(value);
        if(!this.rootNode) {
            this.rootNode = treeNode;
            return this;
        }
        this.addNode(value, this.rootNode);
    }

    addNode(value, node) {
        if (value < node.value) {
            if (node.left) {
                this.addNode(value, node.left);
            } else {
                node.left = new TreeNode(value);
            }
        }

        if(value > node.value) {
            if(node.right) {
                this.addNode(value, node.right);
            } else {
                node.right = new TreeNode(value);
            }
        }
    }

    findNodeTree(value) {
        if(this.rootNode.value === value) {
            return this.rootNode;
        }

        return this.findNode(value,this.rootNode);
    }

    findNode(value, node) {
        if (value < node.value) {
            if (node.left) {
                const nodeLeft = node.left;
                return nodeLeft.value === value ? nodeLeft : this.findNode(value, nodeLeft);
            }
        }

        if(value > node.value) {
            if(node.right) {
                const nodeRight = node.right;
                return nodeRight.value === value ? nodeRight : this.findNode(value, nodeRight);
            }
        }
    }

    findMinTreeNode(node) {
        return this.findMin(node);
    }

    findMin(node) {
        return node.left ? this.findMin(node.left) : node;
    }

    deleteTreeNode(value) {
        this.deleteNode(value, this.rootNode);
    }

    deleteNode(value, node) {
        if (value < node.value) {
            node.left = this.deleteNode(value, node.left);
        } else if (value > node.value) {
            node.right = this.deleteNode(value, node.right);
        } else {
            let temp;
            if(!node.left) {
                return node.right;
            }
            if(!node.left) {
                return node.right;
            }
            temp = this.findMinTreeNode(node.right);
            node.value = temp.value;
            node.right = this.deleteNode(temp.value, node.right);
            return node;
        }
        return node;
    }

    breadthTraverseTreeNodes() {
        this.queue = [];
        this.results = [];

        this.breadthTraverse(this.rootNode);
        return this.results
    }

    breadthTraverse(node) {
        node.left && this.queue.push(node.left);
        node.right && this.queue.push(node.right);
        node && this.results.push(node.value);

        if(this.queue.length) {
            this.breadthTraverse(this.queue.shift())
        }
    }

    preorderDepthTraverseTreeNode() {
        this.queue = [];
        this.results = [];
        this.preorderDepthTraverse(this.rootNode);
    }

    preorderDepthTraverse(node) {
        this.results.push(node.value);
        node.left && this.preorderDepthTraverse(node.left);
        node.right && this.preorderDepthTraverse(node.right);
    }

    postrderDepthTraverseTreeNode() {
        this.queue = [];
        this.results = [];
        this.postorderDepthTraverse(this.rootNode);
    }

    postorderDepthTraverse(node) {
        node.left && this.postorderDepthTraverse(node.left);
        this.results.push(node.value);
        node.right && this.postorderDepthTraverse(node.right);
    }
}

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


const BST = new BinarySearchTree();

BST.addTreeNode(100);
BST.addTreeNode(150);
BST.addTreeNode(140);
BST.addTreeNode(170);
BST.addTreeNode(130);
BST.addTreeNode(148);
BST.addTreeNode(160);
BST.addTreeNode(177);
BST.addTreeNode(50);
BST.addTreeNode(25);
BST.addTreeNode(20);
BST.addTreeNode(35);
BST.addTreeNode(90);
BST.addTreeNode(85);
BST.addTreeNode(95);
BST.postrderDepthTraverseTreeNode();
console.log(BST.results);

