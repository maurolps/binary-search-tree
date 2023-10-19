import { Tree } from "./bst.js";

const arr = Array.from({ length: 15 }, (_, index) => index + 1);

const bsTree = Tree(arr);

bsTree.prettyPrint();
console.log("Tree balanced: ", bsTree.isBalanced());
console.log("In order", bsTree.inOrder());
console.log("Pre order", bsTree.preOrder());
console.log("Post order", bsTree.postOrder());
console.log("Insert to the tree [18, 23, 24, 30]");
bsTree.insert(18);
bsTree.insert(23);
bsTree.insert(24);
bsTree.insert(30);
console.log("Tree balanced: ", bsTree.isBalanced());
console.log("rebalance()");
bsTree.rebalance();
console.log("Tree balanced: ", bsTree.isBalanced());
console.log("In order", bsTree.inOrder());
console.log("Pre order", bsTree.preOrder());
console.log("Post order", bsTree.postOrder());
