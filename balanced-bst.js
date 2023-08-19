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
    createBST(arr, start, end){
        if(start > end)
            return null;

        const mid = parseInt((start + end) / 2);
        const node = new Node(arr[mid]);

        node.left = this.createBST(arr, start, mid - 1);
        node.right = this.createBST(arr, mid + 1, end);

        return node;
    }

    buildTree (arr) {
        arr.sort((a, b) => a - b);
        arr = [...new Set(arr)];

        this.root = this.createBST(arr, 0, arr.length - 1);
        return this.root;
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [4, 3, 2, 1, 5, 7, 6, 8, 9, 10]
const tree = new Tree();
console.log(tree.buildTree(arr))
prettyPrint(tree.root)
