class Node {
    constructor (value) {
        this.value = value,
        this.left = null,
        this.right = null
    }
}

class Tree {
    constructor () {
        this.root = null
    }

    buildTree (arr) {
        arr.sort((a, b) => a - b);
        return [...new Set(arr)];
    }
}
const arr = [4, 3, 2, 1, 1, 2, 4, 5, 5]
const tree = new Tree();
console.log(tree.buildTree(arr))
