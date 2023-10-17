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

function Tree (arr = [ 1, 2, 4, 5, 6, 7, 8]) {
  const root = buildTree(arr, 0, 6);
  
  const insert = (data, treeRoot = root) => {
    if (treeRoot == null) {
      treeRoot = Node(data);
      return treeRoot;
    }
    if (data < treeRoot.data) {
      treeRoot.left = insert(data, treeRoot.left);
    } else if (data > treeRoot.data) {
      treeRoot.right = insert(data, treeRoot.right);
    }
    return treeRoot;
  }

  const findNode = (data, treeRoot = root) => {
    if (treeRoot == null) {
      return null;
    }
    if (treeRoot.data === data)  return treeRoot;
    if (data < treeRoot.data) {
      treeRoot = findNode(data, treeRoot.left);
    } else if (data > treeRoot.data) {
      treeRoot = findNode(data, treeRoot.right);
    }
    return treeRoot;
  }

  const deleteNode = (data, treeRoot = root) => {
    if (treeRoot == null) return null;
    let prevNode = null;

    // find Node to be deleted and his predecessor
    if (treeRoot.data === data)  return treeRoot;
    if (data < treeRoot.data) {
      if(treeRoot.left.data === data) prevNode = treeRoot;
      treeRoot = deleteNode(data, treeRoot.left);
    } else if (data > treeRoot.data) {
      if(treeRoot.right.data === data) prevNode = treeRoot;
      treeRoot = deleteNode(data, treeRoot.right);
    }

    if (treeRoot == null) return null;

    // if has no child delete his predecessor link
    if (treeRoot.right == null && treeRoot.left == null) {
      if (treeRoot === prevNode.right) prevNode.right = null
      else prevNode.left = null;
      return null;
    }

    console.log('This node contains children...');




  }

  // Print a structured format of the Tree to console.
const prettyPrint = (node = root, prefix = "", isLeft = true) => {
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

  return {insert, prettyPrint, findNode, deleteNode}
}

const bsTree = Tree();
bsTree.prettyPrint();
// bsTree.insert(3);
// bsTree.prettyPrint();
bsTree.deleteNode(4);
bsTree.prettyPrint();