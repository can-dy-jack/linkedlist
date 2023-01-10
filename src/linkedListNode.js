/**
 * can-dy-jack/linkedlist
 * @license MIT
 * @copyright 2023 can-dy-jack
 *
 * @class LinkedListNode
 */
class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  getValue() {
    return this.value;
  }

  setNext(next) {
    if (next && !(next instanceof LinkedListNode)) {
      throw new Error('setNext get a wrong argument or null');
    }
    this.next = next || null;
    return this;
  }

  getNext() {
    return this.next;
  }

  hasNext() {
    return this.next !== null;
  }
}

exports.LinkedListNode = LinkedListNode;
