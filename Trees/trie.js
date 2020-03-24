class Trie {
    constructor() {
        this.root = {};
    }

    checkIfLetterIsLast(word, index) {
        return !word[index + 1];
    }

    addWordsToTree(words) {
        words.forEach((word) => {
            this.addLetterRecurssivly(this.root, word, 0);
        });
    }
    addLetterRecurssivly(nodes, word, index) {
        const letter = word[index];
        if (letter) {
            if(nodes[letter]) {
                nodes[letter].isFinalChar = nodes[letter].isFinalChar || this.checkIfLetterIsLast(word, index);
                index++;
                this.addLetterRecurssivly(nodes[letter].children, word, index);
            } else {
                nodes[letter] = new Node(letter);
                nodes[letter].isFinalChar = nodes[letter].isFinalChar || this.checkIfLetterIsLast(word, index);
                index++;
                this.addLetterRecurssivly(nodes[letter].children, word, index);
            }
        }
    }

    searchWord(word) {
        return this.recursiveSearch(this.root, word, 0);
    }
    recursiveSearch(nodes, word, index) {
        const letter = word[index];

        const currentNode = nodes[letter];

        if(currentNode) {
            if(currentNode.isFinalChar && this.checkIfLetterIsLast(word, index)) {
                return true;
            } else {
                index++;
                return this.recursiveSearch(currentNode.children, word, index);
            }
        }
        return false;
    }

    deleteWord(word) {
        this.recursivelyDeleteWord(this.root, word, 0);
        const rootNode = this.root[word[0]];
        this.deleteNode(this.root, !Object.keys(rootNode.children).length, word[0]);
    }

    deleteNode(nodes, condition, letter) {
        if(condition) {
            delete nodes[letter];
        }
    }

    recursivelyDeleteWord(nodes, word, index) {
        const letter = word[index];
        const currentNode = nodes[letter];
        if(currentNode) {
            if(currentNode.isFinalChar && this.checkIfLetterIsLast(word, index)) {
                return;
            }
            index++;
            this.recursivelyDeleteWord(currentNode.children, word, index);
            const latterNode = currentNode.children[word[index]];
            if(latterNode) {
                const condition = !Object.keys(latterNode.children).length;
                this.deleteNode(currentNode.children, condition, word[index]);
            }
        }
    }

    autoComplete(str) {
        const currentNode = this.isPrefixExists(this.root,str,0);
        if(currentNode) {
            return this.recursivelyFindAllWords(currentNode, str, '', []);
        }
        console.log('no such combination');
    }
    recursivelyFindAllWords(node, str, word, answers) {
        if(node.isFinalChar) {
            answers.push(str + word)
        }
        let temp = word;
        const children = node.children;

        for(let key in children) {
            temp = word + key;
            answers = this.recursivelyFindAllWords(children[key],str,temp,answers);
        }
        return answers;
    }

    isPrefixExists(nodes, str, index) {
        let currentNode = nodes[str[index]];
        for(let i = 1; i <= str.length - 1; i++) {
            const letter = str[i];
            currentNode = currentNode.children[letter];
        }
        return currentNode;
    }

}

class Node {
    constructor(char) {
        this.char = char;
        this.children = {};
        this.isFinalChar = false;
    }
}

const trie = new Trie();
trie.addWordsToTree(['aa','aaa']);
console.log(trie.autoComplete('a'));
