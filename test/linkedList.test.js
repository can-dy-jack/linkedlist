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
    let saveNode;
    it('add a node at the end of the LinkedList.', () => {
      saveNode = root.insertTail(21);
      expect(saveNode).to.be.instanceOf(LinkedListNode);
      assert.equal(root.getCount(), 3);
    });

    it('add a node at the end of the LinkedList; loop from giving node.', () => {
      expect(root.insertTail(22, saveNode)).to.be.instanceOf(LinkedListNode);
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
    it('remove nodes based on a callback', () => {
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
    it('filter the linkedlist based on a callback, return a new LinkedList.', () => {
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

  describe('map() test', () => {
    it('map the linkedlist\' value based on a callback, return a new LinkedList.', () => {
      const newRoot = root.map((n) => n % 2);
      expect(newRoot.toArray()).to.eql([0, 1, 0]);
      expect(root.toArray()).to.eql([12, 41, 42]);
      expect(root === newRoot).to.equal(false);
    });

    it('throw error when callback is not function', () => {
      expect(
        () => root.map(41)
      ).to.throw(Error).and.to.have.property(
        'message',
        'map(callback) expect a function.'
      );
    });
  });

  describe('reduce() test', () => {
    it('reduce the linkedlist based on a callback, return value.', () => {
      const newRoot = root.reduce((pre, cur) => cur + pre, 0);
      expect(newRoot).to.equal(95);
    });

    it('throw error when callback is not function', () => {
      expect(
        () => root.reduce('44')
      ).to.throw(Error).and.to.have.property(
        'message',
        'reduce(callback) expect a function.'
      );
    });
  });

  describe('insertBefore() test', () => {
    it('Add a node before the head node', () => {
      const Twelve = root.find((n) => n.getValue() === 12);
      expect(root.insertBefore(Twelve, 1)).to.equal(true);
      expect(root.getCount()).to.equal(4);
      expect(root.toArray()).to.eql([1, 12, 41, 42]);
    });

    it('Add a node before the normal node', () => {
      const FortyOne = root.find((n) => n.getValue() === 41);
      expect(root.insertBefore(FortyOne, 13)).to.equal(true);
      expect(root.getCount()).to.equal(5);
      expect(root.toArray()).to.eql([1, 12, 13, 41, 42]);
    });

    it('throw an error when the giving node is not LinkedListNode', () => {
      expect(
        () => root.insertBefore(1, 40)
      ).to.throw(Error).to.have.property(
        'message',
        'insertBefore() expect a LinkedListNode.'
      );
    });
  });

  describe('insertAfter() test', () => {
    it('Add a node after the giving node', () => {
      const Thirteen = root.find((n) => n.getValue() === 13);
      expect(root.insertAfter(Thirteen, 14)).to.equal(true);
      expect(root.getCount()).to.equal(6);
      expect(root.toArray()).to.eql([1, 12, 13, 14, 41, 42]);
    });

    it('Add a node before the end node', () => {
      const FortyTwo = root.find((n) => n.getValue() === 42);
      expect(root.insertAfter(FortyTwo, 43)).to.equal(true);
      expect(root.getCount()).to.equal(7);
      expect(root.toArray()).to.eql([1, 12, 13, 14, 41, 42, 43]);
    });

    it('throw an error when the giving node is not LinkedListNode', () => {
      expect(
        () => root.insertAfter(1, 40)
      ).to.throw(Error).to.have.property(
        'message',
        'insertAfter() expect a LinkedListNode.'
      );
    });
  });

  describe('removeBefore() test', () => {
    it('can\'t remove a node in front of the head node', () => {
      expect(root.removeBefore(root.getHead())).to.equal(false);
    });

    it('it can remove the head node', () => {
      expect(root.removeBefore(root.getHead().getNext())).to.equal(true);
      expect(root.getCount()).to.equal(6);
      expect(root.toArray()).to.eql([12, 13, 14, 41, 42, 43]);
    });

    it('remove nodes before the giving normal node', () => {
      const FortyOne = root.find((n) => n.getValue() === 41);
      expect(root.removeBefore(FortyOne)).to.equal(true);
      expect(root.getCount()).to.equal(5);
      expect(root.toArray()).to.eql([12, 13, 41, 42, 43]);
    });

    it('throw new Error when node is not LinkedListNode', () => {
      expect(
        () => root.removeBefore(1, 40)
      ).to.throw(Error).to.have.property(
        'message',
        'removeBefore() expect a LinkedListNode.'
      );
    });
  });

  describe('removeAfter() test', () => {
    it('can\'t remove a node after the end node', () => {
      const Tail = root.find((n) => n.getValue() === 43);
      expect(root.removeAfter(Tail)).to.equal(false);
    });

    it('remove nodes after the giving node', () => {
      const Thirteen = root.find((n) => n.getValue() === 13);
      expect(root.removeAfter(Thirteen)).to.equal(true);
      expect(root.getCount()).to.equal(4);
      expect(root.toArray()).to.eql([12, 13, 42, 43]);
    });

    it('throw new Error when node is not LinkedListNode', () => {
      expect(
        () => root.removeAfter(1, 40)
      ).to.throw(Error).to.have.property(
        'message',
        'removeAfter() expect a LinkedListNode.'
      );
    });
  });

  describe('reverse() test', () => {
    it('reverse the linkedlist', () => {
      expect(root.toArray()).to.eql([12, 13, 42, 43]);
      root.reverse();
      expect(root.toArray()).to.eql([43, 42, 13, 12]);
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
