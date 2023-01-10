/**
 * can-dy-jack/linkedlist
 * @license MIT
 * @copyright 2023 can-dy-jack
 */

const { LinkedListNode } = require('./linkedListNode');

/**
 * @class
 */
class LinkedList {
  constructor(head = null, count = 0) {
    this.head = head;
    this.count = count;
  }

  /**
   * @description add a node at the beginnig of the LinkedList.
   */
  insertHead(value) {
    const newHead = new LinkedListNode(value, this.head);
    this.head = newHead;
    this.count += 1;
    return this.head;
  }

  /**
   * @description add a node at the end of the LinkedList.
   */
  insertTail(value, startNode = null) {
    if (this.isEmpty()) {
      return this.insertHead(value);
    }

    let cur = startNode == null ? this.head : startNode;
    while (cur.hasNext()) {
      cur = cur.getNext();
    }

    cur.setNext(new LinkedListNode(value, null));
    this.count += 1;
    return cur.getNext();
  }

  /**
   * @description add a node at a specify location
   */
  insertAt(position, value) {
    if (Number.isNaN(position)
      || position < 0
      || position > this.count
    ) {
      throw new Error('insertAt() get a wrong position.');
    }
    if (position === 0) {
      return this.insertHead(value);
    }
    let cur = 1;
    let prev = this.head;
    while (cur < position) {
      cur += 1;
      prev = prev.getNext();
    }
    prev.setNext(new LinkedListNode(value, prev.getNext()));
    this.count += 1;
    return prev.getNext();
  }

  /**
   * @description Add a node before the giving node
   */
  insertBefore(node, value) {
    if (!node
      || !(node instanceof LinkedListNode)
    ) {
      throw new Error('insertBefore() expect a LinkedListNode.');
    }

    let cur = this.head;
    let pre = null;
    while (cur && cur !== node) {
      pre = cur;
      cur = cur.getNext();
    }

    if (pre == null) { // insert head
      this.insertHead(value);
    } else {
      const newNode = new LinkedListNode(value);
      pre.setNext(newNode);
      newNode.setNext(cur);
      this.count += 1;
    }
    return true;
  }

  /**
   * @description Add a node after the giving node
   */
  insertAfter(node, value) {
    if (!node
      || !(node instanceof LinkedListNode)
    ) {
      throw new Error('insertAfter() expect a LinkedListNode.');
    }

    const newNode = new LinkedListNode(value);
    if (node.getNext() == null) { // end node
      node.setNext(newNode);
    } else {
      newNode.setNext(node.getNext());
      node.setNext(newNode);
    }
    this.count += 1;
    return true;
  }

  /**
   * @description remove a node at the beginnig of the LinkedList.
   */
  removeHead() {
    if (this.isEmpty()) return null;

    const removeNode = this.head;
    this.head = this.head.getNext();
    this.count -= 1;
    return removeNode.setNext(null);
  }

  /**
   * @description remove a node at the end of the LinkedList.
   */
  removeTail() {
    if (this.isEmpty()) {
      return null;
    }
    let cur = this.head.getNext();
    let prev = this.head;
    while (cur.hasNext()) {
      cur = cur.getNext();
      prev = prev.getNext();
    }
    if (prev == null) { // just one node
      return this.removeHead();
    }
    prev.setNext(null);
    this.count -= 1;
    return cur;
  }

  /**
   * @description remove a node at a specify location
   */
  removeAt(pos) {
    if (
      typeof pos !== 'number'
      || Number.isNaN(pos)
      || pos < 0
      || pos >= this.count
    ) { // not number || is NaN || less than 0 || more than this.count
      return null;
    }
    if (pos === 0) {
      return this.removeHead();
    }

    let cur = 1;
    let pre = this.head;
    while (cur < pos) {
      cur += 1;
      pre = pre.getNext() || null;
    }
    const removeNode = pre.getNext();
    pre.setNext(pre.getNext().getNext() || null);
    this.count -= 1;
    return removeNode.setNext(null);
  }

  /**
   * @description remove nodes based on a callback
   * @returns number of removed nodes
   */
  removeEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('removeEach(callback) expect a function');
    }

    let removeCount = 0;
    let pos = 0;
    let pre = null;
    let cur = this.head;
    while (cur) {
      if (callback(cur, pos)) { // get true, remove
        if (pre == null) { // remove head node
          this.head = this.head.getNext();
          cur = this.head;
        } else {
          pre.setNext(pre.getNext().getNext());
          cur = cur.getNext();
        }
        this.count -= 1;
        removeCount += 1;
      } else {
        pre = cur;
        cur = cur.getNext();
      }
      pos += 1;
    }
    return removeCount;
  }

  /**
   * @description Traverses the list from beginning to end.
   */
  forEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('forEach(callback) expect a function');
    }

    let cur = this.head;
    let pos = 0;
    while (cur !== null) {
      callback(cur, pos);
      pos += 1;
      cur = cur.getNext();
    }
  }

  /**
   * @description find a node in the linkedlist based on a callback
   */
  find(callback, startNode = this.head) {
    if (typeof callback !== 'function') {
      throw new Error('find(callback) expect a function');
    }

    if (startNode && !(startNode instanceof LinkedListNode)) {
      throw new Error('find() expects to start from a LinkedListNode');
    }

    let cur = startNode;
    while (cur) {
      if (callback(cur)) {
        return cur;
      }
      cur = cur.getNext();
    }
    return null;
  }

  /**
   * @description filter the linkedlist based on a callback, return a new object.
   */
  filter(callback) {
    if (typeof callback !== 'function') {
      throw new Error('filter(callback) expect a function.');
    }

    let node = null;
    const res = new LinkedList();
    this.forEach((cur, pos) => {
      if (callback(cur, pos)) {
        node = res.insertTail(cur.getValue(), node);
      }
    });
    return res;
  }

  /**
   * @description check if the likedlist is empty.
   */
  isEmpty() {
    return this.count === 0;
    // return this.head == null;
  }

  /**
   * @description get the head node
   */
  getHead() {
    return this.head;
  }

  /**
   * @description get the count
   */
  getCount() {
    return this.count;
  }

  /**
   * @description convert linkedlist into Array
   */
  toArray() {
    const ans = [];
    this.forEach((cur) => {
      ans.push(cur.getValue());
    });
    return ans;
  }

  /**
   * @description clear the linkedlist
   */
  clear() {
    this.head = null;
    this.count = 0;
  }

  /**
   * @description create a LinkedList from an Array
   */
  static fromArray(arr) {
    if (arr.length === 0) {
      return new LinkedList();
    }
    const newLinkedList = new LinkedList();
    let last = newLinkedList.getHead();
    arr.forEach((a) => {
      last = newLinkedList.insertTail(a, last) || null;
    });
    return newLinkedList;
  }
}

exports.LinkedList = LinkedList;
