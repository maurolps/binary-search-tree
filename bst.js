const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function Node ( data, left = null, right = null) {
	return { data, left, right }
}

// returns root Node of a Balanced Binary Search Tree
function buildTree(arr, start, end) {
  if (start > end) return null;
  const mid = parseInt(( start + end ) / 2);
  const root = Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

function Tree (arr = [ 1, 2, 3, 4, 5, 6, 7]) {
  const root = buildTree(arr, 0, 7);
  prettyPrint(root);
}

Tree();