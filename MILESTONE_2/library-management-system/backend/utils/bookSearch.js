// class BookSearchTree {
//     constructor() {
//       this.root = null;
//     }
  
//     insert(book) {
//       const newNode = { book, left: null, right: null };
      
//       if (!this.root) {
//         this.root = newNode;
//         return;
//       }
  
//       let current = this.root;
//       while (true) {
//         if (book.availableCount < current.book.availableCount) {
//           if (!current.left) {
//             current.left = newNode;
//             break;
//           }
//           current = current.left;
//         } else {
//           if (!current.right) {
//             current.right = newNode;
//             break;
//           }
//           current = current.right;
//         }
//       }
//     }
  
//     findAvailableBooks() {
//       const availableBooks = [];
//       this.inorderTraversal(this.root, availableBooks);
//       return availableBooks;
//     }
  
//     inorderTraversal(node, result) {
//       if (node) {
//         this.inorderTraversal(node.left, result);
//         if (node.book.availableCount > 0) {
//           result.push(node.book);
//         }
//         this.inorderTraversal(node.right, result);
//       }
//     }
//   }
  
//   module.exports = BookSearchTree;
  
class TreeNode {
  constructor(book) {
    this.book = book;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(book) {
    const newNode = new TreeNode(book);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.insertNode(this.root, newNode);
  }

  insertNode(node, newNode) {
    if (newNode.book.title < node.book.title) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  search(title) {
    return this.searchNode(this.root, title);
  }

  searchNode(node, title) {
    if (!node) return null; // Not found
    if (title === node.book.title) return node.book; // Found
    return title < node.book.title 
      ? this.searchNode(node.left, title) 
      : this.searchNode(node.right, title);
  }

  inOrderTraversal(node, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.book);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  delete(title) {
    this.root = this.deleteNode(this.root, title);
  }

  deleteNode(node, title) {
    if (!node) return null;

    if (title < node.book.title) {
      node.left = this.deleteNode(node.left, title);
      return node;
    } else if (title > node.book.title) {
      node.right = this.deleteNode(node.right, title);
      return node;
    } else { // Node to be deleted found
      if (!node.left && !node.right) return null; // No children
      if (!node.left) return node.right; // One child (right)
      if (!node.right) return node.left; // One child (left)

      // Node with two children:
      const minLargerNode = this.findMin(node.right); // Find the smallest in the right subtree
      node.book = minLargerNode.book; // Replace with the smallest value
      node.right = this.deleteNode(node.right, minLargerNode.book.title); // Delete the smallest value
      return node;
    }
  }

  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }
}

module.exports = BinarySearchTree;
