function deepCopy(obj) {
  if (!obj) return obj;
  let copy = { ...obj };

  Object.keys(copy).forEach(key => {
    if (typeof copy[key] === "object") {
      copy[key] = deepCopy(copy[key]);
    }
  });

  return copy;
}

export class Zipper {
  constructor(tree, parent = null) {
    this.tree = tree;
    this.parent = parent;
  }

  static fromTree(tree) {
    return new Zipper(deepCopy(tree));
  }

  toTree() {
    return this.parent ? this.parent.toTree() : this.tree;
  }

  left() {
    return this.tree.left ? new Zipper(this.tree.left, this) : null;
  }

  right() {
    return this.tree.right ? new Zipper(this.tree.right, this) : null;
  }

  up() {
    return this.parent;
  }

  value() {
    return this.tree.value;
  }

  setValue(value) {
    this.tree.value = value;
    return this;
  }

  setLeft(subTree) {
    this.tree.left = deepCopy(subTree);
    return this;
  }

  setRight(subTree) {
    this.tree.right = deepCopy(subTree);
    return this;
  }
}
