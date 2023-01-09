const { expect, assert } = require('chai');
const { LinkedListNode } = require('../src/linkedListNode');
const { LinkedList } = require('../src/linkedList');

describe('LinkedList Tests', () => {
  const root = new LinkedList();

  describe('insertHead() test', () => {
    it('add a node at the beginnig of the LinkedList.', () => {
      expect(root.insertHead(12)).to.be.instanceOf(LinkedListNode);
      assert.equal(root.getCount(), 1);
      expect(root.insertHead(11)).to.be.instanceOf(LinkedListNode);
      assert.equal(root.getCount(), 2);
    });
  });

  describe('insertTail() test', () => {
    it('add a node at the end of the LinkedList.', () => {
      expect(root.insertTail(21)).to.be.instanceOf(LinkedListNode);
      assert.equal(root.getCount(), 3);
      expect(root.insertTail(22)).to.be.instanceOf(LinkedListNode);
      assert.equal(root.getCount(), 4);
    });
  });

  describe('insertAt() test', () => {
    it('add a node at a specify location.', () => {
      expect(root.insertAt(2, 31)).to.be.instanceOf(LinkedListNode);
      assert.equal(root.getCount(), 5);
    });

    it('throw an error when position is not a valid number', () => {
      expect(
        () => root.insertAt(-1, 32)
      ).to.throws(Error).and.to.have.property(
        'message',
        'insertAt() get a wrong position.'
      );
    });
  });

  describe('getHead() test', () => {
    it('get the head node', () => {
      expect(root.getHead().getValue()).to.equal(11);
    });
  });

  describe('getCount() test', () => {
    it('get the count', () => {
      expect(root.getCount()).to.equal(5);
    });
  });

  describe('isEmpty() test', () => {
    it('check if the likedlist is empty.', () => {
      expect(root.isEmpty()).to.equal(false);
    });
  });

  describe('toArray() test', () => {
    it('convert linkedlist into Array', () => {
      expect(root.toArray()).to.deep.equal([11, 12, 31, 21, 22]);
    });
  });

  describe('removeHead() test', () => {
    it('remove a node at the beginnig of the LinkedList.', () => {
      expect(root.getHead().getValue()).to.equal(11);

      const removedNode = root.removeHead(); // [12, 31, 21, 22]
      expect(removedNode).to.instanceOf(LinkedListNode);

      expect(removedNode.getValue()).to.equal(11);
      assert.equal(root.getCount(), 4);

      expect(root.getHead().getValue()).to.equal(12);
    });
  });

  describe('removeTail() test', () => {
    it('remove a node at the end of the LinkedList.', () => {
      expect(root.toArray()).to.deep.equal([12, 31, 21, 22]);

      const removedNode = root.removeTail();
      expect(removedNode).to.instanceOf(LinkedListNode);
      expect(removedNode.getValue()).to.equal(22);
      assert.equal(root.getCount(), 3);

      expect(root.toArray()).to.deep.equal([12, 31, 21]);
    });
  });

  describe('removeAt() test', () => {
    it('remove a node at a specify location.', () => {
      const removedNode = root.removeAt(1);
      expect(removedNode).to.instanceOf(LinkedListNode);
      expect(removedNode.getValue()).to.equal(31);
      assert.equal(root.getCount(), 2);
      expect(root.toArray()).to.deep.equal([12, 21]);
    });
    it('return null and do nothing when position is not valid', () => {
      expect(root.removeAt(-1)).to.equal(null);
      expect(root.removeAt('1')).to.equal(null);
      expect(root.removeAt(2)).to.equal(null);
      expect(root.toArray()).to.deep.equal([12, 21]);
    });
  });

  describe('removeEach() test', () => {
    it('removeEach', () => {
      root.insertTail(41);
      root.insertTail(42);
      expect(root.toArray()).to.deep.equal([12, 21, 41, 42]);
      expect(root.removeEach(
        (n) => n.getValue() < 41 && n.getValue() > 12
      )).to.equal(1); // remove 2 nodes
      expect(root.getCount()).to.equal(3);
      expect(root.toArray()).to.deep.equal([12, 41, 42]);
    });
    it('throw error when callback is not function', () => {
      expect(
        () => root.removeEach(21)
      ).to.throw(Error).and.to.have.property(
        'message',
        'removeEach(callback) expect a function'
      );
    });
  });

  describe('forEach() test', () => {
    it('Traverses the list from beginning to end.', () => {
      const arr = [];
      root.forEach((node) => {
        const val = node.getValue();
        if (val > 40) arr.push(val);
      });
      expect(arr).to.deep.equal([41, 42]);
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

  describe('find() test', () => {
    it('find a node in the linkedlist based on a callback.', () => {
      const num1 = root.find((n) => n.getValue() === 41);
      const num2 = root.find((n) => n.getValue() === 21);
      expect(num1.getValue()).to.be.equal(41);
      expect(num2).to.be.equal(null);
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
      const n5 = root.find((node) => node.getValue() === 12);
      const n4 = root.find((node) => node.getValue() === 42, n5);
      expect(n4.getValue()).to.equal(42);
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
    it('filter the linkedlist based on a callback, return a new object.', () => {
      expect(root.filter((n) => n.getValue() > 40).toArray()).to.deep.equal([41, 42]);
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
      expect(root.getCount()).to.equal(0);
      expect(root.isEmpty()).to.equal(true);
      expect(root.toArray()).to.deep.equal([]);
    });
  });

  describe('static fromArray() test', () => {
    it('create a LinkedList from an Array', () => {
      expect(
        LinkedList.fromArray(['a', 'b', 'c', 'd']).toArray()
      ).to.eql(['a', 'b', 'c', 'd']);
    });
  });
});
