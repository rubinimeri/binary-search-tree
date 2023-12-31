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

    insert (value, root) {
        root = root || this.root;
        if(value < root.value && root.left === null){
            root.left = new Node(value);
            return;
        }
        else if(value >= root.value && root.right === null){
            root.right = new Node(value);
            return;
        }
        else if(value < root.value){
            this.insert(value, root.left);
        }
        else {
            this.insert(value, root.right);
        }
    }

    delete(value, root = this.root) {
        // If root doesn't have any nodes
        if(root === null) {
            return root;
        }
        // If value is smaller that root.value, then value is
        // in the left subtree
        if(value < root.value) {
            root.left = this.delete(value, root.left);
        } 
        // If value is bigger that root.value, then value is
        // in the right subtree
        else if (value > root.value) {
            root.right = this.delete(value, root.right);
        }
        // else if the value is found then it's prepared for deletion
        else {
            // If there is no child or one
            if(root.left === null) {
                return root.right;
            }
            else if(root.right === null) {
                return root.left
            }

            // Node with two children
            const successor = this._nextGreatest(root.right);
            root.value = successor;

            // Delete the 'next greatest'
            root.right = this.delete(successor, root.right);
        }
        return root;
    }

    _nextGreatest(node) {
        while(node.left !== null) {
            node = node.left;
        }
        return node.value;
    }

    find (value, root) {
        root = root || this.root;

        if(value === root.value){
            return root;
        }
        else if(value < root.value){
            return this.find(value, root.left);
        }
        else {
            return this.find(value, root.right);
        }
    }

    levelOrder(root = this.root, arr = [], queue = []) {
        queue.push(root);
        while(queue.length > 0) {
            arr.push(queue[0].value)
            if(queue[0].left !== null){
                queue.push(queue[0].left);
            }
            if(queue[0].right !== null){
                queue.push(queue[0].right);
            }
            queue.shift();
        }
        return arr;
    }

    preorder(root = this.root, arr = []) {
        if(root === null) return arr;
        
        arr.push(root.value);
        this.inorder(root.left, arr);
        this.inorder(root.right, arr);
        return arr;
    }

    inorder(root = this.root, arr = []) {
        if(root === null) return arr;
        
        this.inorder(root.left, arr);
        arr.push(root.value);
        this.inorder(root.right, arr);
        return arr;
    }

    postorder(root = this.root, arr = []) {
        if(root === null) return arr;

        this.postorder(root.left, arr);
        this.postorder(root.right, arr);
        arr.push(root.value)
        return arr;
    }

    height(root = this.root) {
        if(root === null) return -1;

        const leftHeight = this.height(root.left);
        const rightHeight = this.height(root.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(nodeValue, root, depth = 0) {
        if(root === null) return -1;
        root = root || this.root;
        if (nodeValue === root.value) return depth;
        else if (nodeValue < root.value) {
            depth++;
            return this.depth(nodeValue, root.left, depth);
        } else if (nodeValue >= root.value) {
            depth++;
            return this.depth(nodeValue, root.right, depth);
        }
    }

    isBalanced(root = this.root) {
        if(Math.abs(this.height(root.left) - this.height(root.right)) > 1) return false;
        return true;
    }

    rebalance(root = this.root) {
        const newTree = this.inorder();
        this.buildTree(newTree);
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

const randomArr = (arr = []) => {
    while (arr.length < 100) {
        arr.push(Math.floor(Math.random() * 100))
    }
    return arr;
}

// Create BST
let arr = randomArr();
const tree = new Tree();
tree.buildTree(arr);
prettyPrint(tree.root);

// Confirm tree is balanced
console.log(tree.isBalanced());

// Print all elements in pre,post and inorder
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());

// Unbalance tree by adding several numbers > 100
tree.insert(102);
tree.insert(218);
tree.insert(150);

// Confirm tree is unbalanced
console.log(tree.isBalanced());

// Rebalance the tree
tree.rebalance();

// Confirm tree is balanced
console.log(tree.isBalanced());

// Print all elements in pre,post and inorder
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());