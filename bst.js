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

function Tree (arr) {
  const root = buildTree(arr, 0, arr.length -1);
  
  const insert = (data, treeRoot = root) => {
    if (root.data == null) {
      root.data = data;
    }
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

    if (treeRoot.data === data && root.data !== data)  return treeRoot;

    // find Node to be deleted and his predecessor by recursive method
    if (data < treeRoot.data) {
      if(treeRoot.left.data === data) prevNode = treeRoot;
      treeRoot = deleteNode(data, treeRoot.left);
    } else if (data > treeRoot.data) {
      if(treeRoot.right.data === data) prevNode = treeRoot;
      treeRoot = deleteNode(data, treeRoot.right);
    }

    // recursive base case
    if (treeRoot == null) return null;

    // if has no child delete his predecessor link
    if (treeRoot.right == null && treeRoot.left == null) {
      if(prevNode == null) {
        root.data = null;
        return null;
      }
      if (treeRoot === prevNode.right) {
        prevNode.right = null
      } else {
        prevNode.left = null;
      }
      return null;
    } 

    // if has only one child
    else if (treeRoot.right == null || treeRoot.left == null) {
      if (treeRoot.right == null) {
        if(prevNode == null) {
          root.data = treeRoot.left.data;
          root.left = null;
          return null;
        }
        if(treeRoot === prevNode.right) prevNode.right = treeRoot.left
        else prevNode.left = treeRoot.left;        
      } else {
        if(prevNode == null) {
          root.data = treeRoot.right.data;
          root.right = null;
          return null;
        }
        if(treeRoot === prevNode.right) prevNode.right = treeRoot.right
        else prevNode.left = treeRoot.right;
      }
      return null;
    } 
    
    // The node to be deleted has both childs
    else {
      let tmpNode = treeRoot.right;
      if(tmpNode.left == null) {
        treeRoot.data = tmpNode.data;
        treeRoot.right = tmpNode.right;
        return null;
      }
      while (tmpNode.left !== null) {
        prevNode = tmpNode;
        tmpNode = tmpNode.left;        
      }
      
      treeRoot.data = tmpNode.data;
      prevNode.left = null;

      return null;
    }
  }

  // Traverse the tree in breadth-first level
  // Provide each node as argument to the callback
  // Returns an array of data if no callback given
  const levelOrder = ( callback, treeRoot = root, queue = [root]) => {
    const queueArr = [];
    const traverse = (treeRoot, queue) => {    
      if (queue.length < 1) return;
      if (treeRoot == null) return;

      const dataNode = queue.shift();
      if (!callback) {
        queueArr.push(dataNode.data)
      } else {
        callback(dataNode);
      }
      if (treeRoot.left !== null) queue.push(treeRoot.left);
      if (treeRoot.right !== null) queue.push(treeRoot.right);
      traverse(queue[0], queue);
    }
    traverse(treeRoot, queue);
    if (!callback) return queueArr;
      
  }

  const order = (type, callback) => {
    const arrOrder = []
    const traverse = (treeRoot = root) => {
      if (treeRoot == null) return;
      if (type === 'preorder') {
        if (!callback) arrOrder.push(treeRoot.data);
        else callback(treeRoot);
      }
      traverse(treeRoot.left);
      if (type === 'inorder') {
        if (!callback) arrOrder.push(treeRoot.data);
        else callback(treeRoot);
      }
      traverse(treeRoot.right);
      if (type === 'postorder') {
        if (!callback) arrOrder.push(treeRoot.data);
        else callback(treeRoot);
      }
    }
    traverse();
    if (!callback) return(arrOrder);
  }

  // inOrder, preOrder, postOrder
  // Provide each node as argument to the callback
  // Returns an array of data if no callback given
  const inOrder = (callback) => {
    if (!callback) return order('inorder')
    else order('inorder', callback)
  }

  const preOrder = (callback) => {
    if (!callback) return order('preorder')
    else order('preorder', callback)
  }

  const postOrder = (callback) => {
    if (!callback) return order('postorder')
    else order('postorder', callback)
  }

  const height = (treeRoot = root) => {
    if(treeRoot == null) {
      return -1;
    } else {
    const leftHeight = height(treeRoot.left);
    const rightHeight = height(treeRoot.right);
    if (leftHeight >= rightHeight) 
      return leftHeight + 1;
    else 
      return rightHeight +1;
    }

  }

  const depth = (node, treeRoot = root) => {
    if (treeRoot == null) return -1;
    if (node === root) return 0;

    if(treeRoot.data === node.data) return 0;

    if(node.data < treeRoot.data) {
      const treeDepth = depth(node, treeRoot.left);
      return treeDepth +1;
    } else if (node.data > treeRoot.data) {
      const treeDepth = depth(node, treeRoot.right);
      return treeDepth +1;
    }

  }

  const rebalance = () => {
    const inOrderTree = order('inorder');
    const newRoot = buildTree(inOrderTree, 0, inOrderTree.length -1);
    root.data = newRoot.data;
    root.left = newRoot.left;
    root.right = newRoot.right;
  }

  const isBalanced = () => {
    let balanced = true;

    const traverse = (treeRoot = root) => {
      if(treeRoot == null) {
        return -1;
      } else {
        const leftHeight = traverse(treeRoot.left);
        const rightHeight = traverse(treeRoot.right);
        if (Math.abs(leftHeight - rightHeight) > 1) balanced = false;

        if (leftHeight >= rightHeight) {
          return leftHeight + 1;
        } else {
          return rightHeight +1;
        }
      }
    }
    
    traverse();
    return balanced;
  }

  // Print a structured format of the Tree to console.
  const prettyPrint = (node = root, prefix = " ", isLeft = true) => {
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

  return {insert, prettyPrint, findNode, deleteNode, levelOrder, 
  inOrder, preOrder, postOrder, height, depth, rebalance, isBalanced}
}

const arr = Array.from({ length: 30 }, (_, index) => index + 1);

const bsTree = Tree(arr);

bsTree.prettyPrint();
bsTree.inOrder();


