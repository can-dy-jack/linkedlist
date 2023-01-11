/**
 * can-dy-jack/linkedlist
 * @license MIT
 * @copyright 2023 can-dy-jack
 *
 * @class DoubleLinkedListNode
 */
class DoubleLinkedListNode {
  constructor(val, next = null, previous = null) {
    this.val = val;
    this.setNext(next);
    this.setPrevious(previous);
  }

  getValue() {
    return this.val;
  }

  setValue(val) {
    this.val = val;
    return this;
  }

  setNext(next = null) {
    if (next && !(next instanceof DoubleLinkedListNode)) {
      throw new Error('setNext() get a wrong argument');
    }

    this.next = next;
    return this;
  }

  getNext() {
    return this.next;
  }

  hasNext() {
    return this.next !== null;
  }

  setPrevious(pre = null) {
    if (pre && !(pre instanceof DoubleLinkedListNode)) {
      throw new Error('setPre() get a wrong argument');
    }

    this.pre = pre;
    return this;
  }

  getPrevious() {
    return this.pre;
  }

  hasPrevious() {
    return this.pre !== null;
  }
}

exports.DoubleLinkedListNode = DoubleLinkedListNode;
