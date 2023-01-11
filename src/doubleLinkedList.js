/**
 * can-dy-jack/linkedlist
 * @license MIT
 * @copyright 2023 can-dy-jack
 */

const { DoubleLinkedListNode } = require('./doubleLinkedListNode');

/**
 * @class DoubleLinkedListNode
 */
class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  /**
   * @description add a node at the beginnig of the DoubleLinkedList.
   */
  insertHead(val) {
    const newNode = new DoubleLinkedListNode(val);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.setPrevious(newNode);
      newNode.setNext(this.head);
      this.head = newNode;
    }
    this.count += 1;
    return this.head;
  }

  /**
   * @description add a node at the end of the DoubleLinkedList.
   */
  insertTail(val) {
    const newNode = new DoubleLinkedListNode(val);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.setNext(newNode);
      newNode.setPrevious(this.tail);
      this.tail = newNode;
    }
    this.count += 1;
    return this.tail;
  }

  /**
   * @description add a node at a specific position.
   */
  insertAt(position, val) {
    if (typeof position !== 'number'
      || Number.isNaN(position)
      || position < 0
      || position > this.count
    ) {
      throw new Error('insertAt() get a wrong position.');
    }

    if (position === 0) { // add in the head
      return this.insertHead(val);
    }

    if (position === this.count) { // add in the tail
      return this.insertTail(val);
    }

    let pos = 1;
    let pre = this.head;
    while (pos < position) {
      pos += 1;
      pre = pre.getNext();
    }
    const newNode = new DoubleLinkedListNode(val);
    newNode.setNext(pre.getNext());
    newNode.setPrevious(pre);
    pre.setNext(newNode);
    pre.getNext().setPrevious(newNode);
    this.count += 1;
    return newNode;
  }

  /**
   * @description remove a node in the head of the DoubleLinkedList.
   */
  removeHead() {
    if (this.isEmpty()) {
      return null;
    }

    const removedNode = this.head;
    if (this.head.getNext()) {
      this.head = this.head.getNext();
      this.head.setPrevious(null);
    } else {
      this.head = null;
      this.tail = null;
    }
    removedNode.setNext(null);
    this.count -= 1;
    return removedNode;
  }

  /**
   * @description remove a node in the end of the DoubleLinkedList.
   */
  removeTail() {
    if (this.isEmpty()) {
      return null;
    }

    const removedNode = this.tail;
    if (this.tail.hasPrevious()) {
      this.tail.getPrevious().setNext(null);
      this.tail = this.tail.getPrevious();
    } else {
      this.head = null;
      this.tail = null;
    }
    this.count -= 1;
    removedNode.setPrevious(null);
    return removedNode;
  }

  /**
   * @description remove a node at a specify location
   */
  removeAt(position) {
    if (typeof position !== 'number'
      || Number.isNaN(position)
      || position < 0
      || position >= this.count
    ) {
      throw new Error('removeAt() get a wrong position.');
    }

    if (position === 0) { // remove in the head
      return this.removeHead();
    }

    if (position === this.count - 1) { // remove in the tail
      return this.removeTail();
    }

    let pos = 1;
    let pre = this.head;
    while (pos < position) {
      pos += 1;
      pre = pre.getNext();
    }
    const removedNode = pre.getNext();
    pre.setNext(removedNode.getNext());
    pre.getNext().setPrevious(pre);

    removedNode.setNext(null);
    removedNode.setPrevious(null);

    this.count -= 1;
    return removedNode;
  }

  /**
   * @description find a node in the DoubleLinkedList based on a callback
   */
  find(callback, startNode = this.head) {
    if (typeof callback !== 'function') {
      throw new Error('find(callback) expect a function');
    }

    if (startNode && !(startNode instanceof DoubleLinkedListNode)) {
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
   * @description filter the linkedlist based on a callback, return a new LinkedList.
   */
  filter(callback) {
    if (typeof callback !== 'function') {
      throw new Error('filter(callback) expect a function.');
    }
    let node = null;
    const res = new DoubleLinkedList();
    this.forEach((cur, pos) => {
      if (callback(cur, pos)) {
        node = res.insertTail(cur.getValue(), node);
      }
    });
    return res;
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
    while (cur) {
      callback(cur, pos);
      pos += 1;
      cur = cur.getNext();
    }
  }

  /**
   * @description Checks if the list is empty.
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * @description get the count
   */
  getCount() {
    return this.count;
  }

  /**
   * @description get the head of doubleLinkedList.
   */
  getHead() {
    return this.head;
  }

  /**
   * @description get the tail of doubleLinkedList.
   */
  getTail() {
    return this.tail;
  }

  /**
   * @description convert the doubleLinkedList into an array.
   */
  toArray() {
    const ans = [];
    this.forEach((n) => {
      ans.push(n.getValue());
    });
    return ans;
  }

  /**
   * @description clear the doubleLinkedList.
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  /**
   * @description create a LinkedList from an Array
   */
  static fromArray(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('fromArray(arr) expect an array');
    }

    if (arr.length === 0) {
      return new DoubleLinkedList();
    }

    const root = new DoubleLinkedList();
    let node = root.getHead();
    arr.forEach((val) => {
      node = root.insertTail(val, node);
    });
    return root;
  }
}

exports.DoubleLinkedList = DoubleLinkedList;
