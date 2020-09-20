class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
  }
}

export class BinarySearchTree {
  constructor(data) {
    this.root = new Node(data) || null;
  }

  get data() {
    return this.root.data;
  }

  get right() {
    return this.root.right;
  }

  get left() {
    return this.root.left;
  }

  each(callback, node = this.root) {
    if (node.left !== null) this.each(callback, node.left);
    if (node.data) callback(node.data);
    if (node.right !== null) this.each(callback, node.right);
  }

  insert(data, node = this.root) {
    if (node.data === null) {
      return (this.root = new Node(data));
    }
    if (data > node.data) {
      return node.right
        ? this.insert(data, node.right)
        : (node.right = new Node(data));
    }
    if (data <= node.data) {
      return node.left
        ? this.insert(data, node.left)
        : (node.left = new Node(data));
    }
  }
}
