const { expect } = require('chai');
const { DoubleLinkedListNode } = require('../src/doubleLinkedListNode');
const { DoubleLinkedList } = require('../src/doubleLinkedList');

describe('doubleLinkedList Tests', () => {
  const root = new DoubleLinkedList();

  describe('insertHead() test', () => {
    it('add a node at the beginnig of an empty DoubleLinkedList.', () => {
      expect(root.insertHead(2)).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getCount()).to.equal(1);
      expect(root.toArray()).to.deep.equal([2]);
    });

    it('add a node at the beginnig of the DoubleLinkedList.', () => {
      expect(root.insertHead(1)).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getCount()).to.equal(2);
      expect(root.toArray()).to.deep.equal([1, 2]);
    });
  });

  describe('insertTail() test', () => {
    it('add a node at the end of the DoubleLinkedList.', () => {
      expect(root.insertTail(3)).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getCount()).to.equal(3);
      expect(root.toArray()).to.deep.equal([1, 2, 3]);
    });

    it('add a node at the end of an empty DoubleLinkedList.', () => {
      const t = new DoubleLinkedList();
      expect(t.insertHead(1)).to.be.instanceOf(DoubleLinkedListNode);
      expect(t.getCount()).to.equal(1);
      expect(t.toArray()).to.deep.equal([1]);
    });
  });

  describe('insertAt() test', () => {
    it('throw an error when the position is not valid number.', () => {
      expect(
        () => root.insertAt('1', 21)
      ).to.throw(Error).to.have.property(
        'message',
        'insertAt() get a wrong position.'
      );
    });

    it('add a node at head.', () => {
      expect(root.insertAt(0, 0)).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getCount()).to.equal(4);
      expect(root.toArray()).to.deep.equal([0, 1, 2, 3]);
    });
    it('add a node at tail.', () => {
      expect(root.insertAt(4, 4)).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getCount()).to.equal(5);
      expect(root.toArray()).to.deep.equal([0, 1, 2, 3, 4]);
    });
    it('add a node at a specific position.', () => {
      expect(root.insertAt(2, 21)).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getCount()).to.equal(6);
      expect(root.toArray()).to.deep.equal([0, 1, 21, 2, 3, 4]);
    });
  });

  describe('getCount() test', () => {
    it('get the count of the DoubleLinkedList.', () => {
      expect(root.getCount()).to.equal(6);
    });
  });

  describe('toArray() test', () => {
    it('convert the doubleLinkedList into an array.', () => {
      expect(root.toArray()).to.deep.equal([0, 1, 21, 2, 3, 4]);
    });
  });

  describe('isEmpty() test', () => {
    it('check if the DoubleLinkedList is empty.', () => {
      expect(root.isEmpty()).to.equal(false);
    });
  });

  describe('getHead() test', () => {
    it('get the head of doubleLinkedList.', () => {
      expect(root.getHead()).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getHead().getValue()).to.equal(0);
    });
  });

  describe('getTail() test', () => {
    it('get the tail of doubleLinkedList.', () => {
      expect(root.getTail()).to.be.instanceOf(DoubleLinkedListNode);
      expect(root.getTail().getValue()).to.equal(4);
    });
  });

  describe('forEach() test', () => {
    it('Traverses the list from beginning to end.', () => {
      const arr = [];
      root.forEach((node) => {
        const val = node.getValue();
        if (val > 9) arr.push(val);
      });
      expect(arr).to.deep.equal([21]);
    });

    it('throw error when callback is not function', () => {
      expect(
        () => root.forEach(21)
      ).to.throw(Error).and.to.have.property(
        'message',
        'forEach(callback) expect a function'
      );
    });
  });

  describe('removeHead() test', () => {
    it('remove the head of the DoubleLinkedList.', () => {
      expect(root.removeHead().getValue()).to.equal(0);
      expect(root.getCount()).to.equal(5);
      expect(root.toArray()).to.deep.equal([1, 21, 2, 3, 4]);
    });
    it('remove the head of the empty DoubleLinkedList.', () => {
      expect(new DoubleLinkedList().removeHead()).to.equal(null);
    });
    it('remove the head of DoubleLinkedList that the just 1 node.', () => {
      const t = new DoubleLinkedList();
      t.insertHead(1);
      expect(t.removeHead(0).getValue()).to.equal(1);
    });
  });

  describe('removeTail() test', () => {
    it('remove a node in the end of the DoubleLinkedList.', () => {
      const removedNode = root.removeTail();
      expect(removedNode.getValue()).to.equal(4);
      expect(root.getCount()).to.equal(4);
      expect(root.toArray()).to.deep.equal([1, 21, 2, 3]);
    });
    it('remove a node in the end of the empty DoubleLinkedList.', () => {
      expect(new DoubleLinkedList().removeTail()).to.equal(null);
    });
    it('remove the tail of DoubleLinkedList that the just 1 node.', () => {
      const t = new DoubleLinkedList();
      t.insertHead(1);
      expect(t.removeTail().getValue()).to.equal(1);
      expect(t.getCount()).to.equal(0);
    });
  });

  describe('removeAt() test', () => {
    it('throw an error when the position is not valid number.', () => {
      expect(
        () => root.insertAt('1', 21)
      ).to.throw(Error).to.have.property(
        'message',
        'insertAt() get a wrong position.'
      );
    });

    it('remove a node at a specific position.', () => {
      expect(root.removeAt(2).getValue()).to.equal(2);
      expect(root.getCount()).to.equal(3);
      expect(root.toArray()).to.deep.equal([1, 21, 3]);
    });

    it('remove a node at head.', () => {
      expect(root.removeAt(0).getValue()).to.equal(1);
      expect(root.getCount()).to.equal(2);
      expect(root.toArray()).to.deep.equal([21, 3]);
    });

    it('remove a node at tail.', () => {
      expect(root.removeAt(1).getValue()).to.equal(3);
      expect(root.getCount()).to.equal(1);
      expect(root.toArray()).to.deep.equal([21]);
    });
  });

  describe('find() test', () => {
    it('find a node in the linkedlist based on a callback.', () => {
      const num1 = root.find((n) => n.getValue() === 41);
      const num2 = root.find((n) => n.getValue() === 21);
      expect(num1).to.be.equal(null);
      expect(num2.getValue()).to.be.equal(21);
    });

    it('throw error when callback is not function', () => {
      expect(
        () => root.find(41)
      ).to.throw(Error).and.to.have.property(
        'message',
        'find(callback) expect a function'
      );
    });

    it('fins a node from giving startNode', () => {
      root.insertTail(12);
      root.insertTail(42);
      const n1 = root.find((node) => node.getValue() === 12);
      const n2 = root.find((node) => node.getValue() === 42, n1);
      expect(n2.getValue()).to.equal(42);
    });

    it('throws an error if startNode is not valid', () => {
      expect(() => root.find(
        (node) => node.getValue() === 42,
        'test'
      )).to.throw(Error).and.to.have.property(
        'message',
        'find() expects to start from a LinkedListNode'
      );
    });
  });

  describe('filter() test', () => {
    it('filter the linkedlist based on a callback, return a new LinkedList.', () => {
      expect(root.filter((n) => n.getValue() > 40).toArray()).to.deep.equal([42]);
    });

    it('throw error when callback is not function', () => {
      expect(
        () => root.filter(41)
      ).to.throw(Error).and.to.have.property(
        'message',
        'filter(callback) expect a function.'
      );
    });
  });

  describe('clear() test', () => {
    it('clear the linkedlist', () => {
      root.clear();
      expect(root.getHead()).to.equal(null);
      expect(root.getTail()).to.equal(null);
      expect(root.getCount()).to.equal(0);
      expect(root.isEmpty()).to.equal(true);
      expect(root.toArray()).to.deep.equal([]);
    });
  });

  describe('static fromArray() test', () => {
    it('create a LinkedList from an Array', () => {
      expect(
        DoubleLinkedList.fromArray(['a', 'b', 'c', 'd']).toArray()
      ).to.eql(['a', 'b', 'c', 'd']);
    });
  });
});
