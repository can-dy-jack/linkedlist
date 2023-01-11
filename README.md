# @kartjim/linkedlist
LinkedList and DoubleLinkedList implementation in JavaScript

> 学习项目，参考自：[datastructures-js/linked-list](https://github.com/datastructures-js/linked-list)

<!-- 代码注释 @params @returns -->
<!-- .d.ts 文件 -->

## install

```sh
npm i @kartjim/linkedlist
```

## require
```js
const {
  LinkedList,
  DoubleLinkedList,
  LinkedListNode,
  DoubleLinkedListNode,
} = require('@kartjim/linkedlist');
```

## import
```js
import {
  LinkedList,
  DoubleLinkedList,
  LinkedListNode,
  DoubleLinkedListNode,
} from '@kartjim/linkedlist';
```
## LinkedList API
### use
constructor

```js
const root = new LinkedList();
```
### insertHead
inserts a node at the beginning of the list.  
time complexity: $O(1)$

```js
root.insertHead(12)
console.log(root.insertHead(11).getCount()) // 11
console.log(root.getCount()) // 2
console.log(root.toArray()) // [11, 12]
```

### insertTail
add a node at the end of the LinkedList.  
time complexity: min $O(1)$ , max $O(n)$
```js
let saveNode = root.insertTail(21);
root.insertTail(22, saveNode);
console.log(root.getCount()) // 4
console.log(root.toArray()) // [11, 12, 21, 22]
```

### insertAt
add a node at a specify location.  
time complexity: $O(n)$
```js
root.insertAt(2, 31)
console.log(root.getCount()) // 5
console.log(root.toArray()) // [11, 12, 31, 21, 22]
```

### getHead
get the head node.  
```js
console.log(root.getHead().getValue()) // 11
```
### getCount
get the nodes count.  
```js
console.log(root.getCount()) // 5
```

### isEmpty
check if the likedlist is empty.  
```js
console.log(root.isEmpty()) // false
```

### toArray
convert linkedlist into Array.  
time complexity: $O(n)$
```js
console.log(root.toArray()) // [11, 12, 31, 21, 22]
```
### reverse
reverse the linkedlist.  

```js
root.reverse();
// [12, 13, 42, 43]
// => 
// [43, 42, 13, 12]
```

### removeHead
remove a node at the beginnig of the LinkedList.  
time complexity: $O(1)$
```js
root.removeHead()
console.log(root.getHead().getValue()) // 12
```

### removeTail
remove a node at the end of the LinkedList.  
time complexity: $O(n)$
```js
root.removeTail()
console.log(root.getCount()) // 3
console.log(root.toArray()) // [12, 31, 21]
```

### removeAt
remove a node at a specify location. 
> First (head) node is at position 0.  

time complexity: $O(n)$
```js
root.removeAt(1)
console.log(root.getCount()) // 2
console.log(root.toArray()) // [12, 21]
```

### removeEach
remove nodes based on a callback.  
```js
root.insertTail(41); root.insertTail(42);
console.log(root.toArray()) // [12, 21, 41, 42]
root.removeEach(
    (n) => n.getValue() < 41 && n.getValue() > 12
)
console.log(root.toArray()) // [12, 41, 42]
```
### forEach
Traverses the list from beginning to end. The original `root` will not be changed.  

```js
const arr = [];
root.forEach((node) => {
    const val = node.getValue();
    if (val > 40) arr.push(val);
});
console.log(arr) // [41, 42]
```

### find
find the first node in the linkedlist based on a callback, get null if nothing is found. It also accepts a second param as the starting node to start searching from. 

```js
const num1 = root.find((n) => n.getValue() === 41);
const num2 = root.find((n) => n.getValue() === 21);
console.log(num1.getValue()) // 41
console.log(num2) // null
```
### filter
filter the linkedlist based on a callback, return a new LinkedList.  

```js
console.log(root.filter((n) => n.getValue() > 40).toArray()) // [41, 42]
```
### map
map the linkedlist\' value based on a callback, return a new LinkedList. 

```js
root.toArray()    // [12, 41, 42]);
const newRoot = root.map((n) => n % 2);
newRoot.toArray()  // [0, 1, 0]
root === newRoot  // false
```
### reduce
reduce the linkedlist based on a callback, return value.

```js
const newRoot = root.reduce((pre, cur) => cur + pre, 0); 
// [12, 41, 42] => 95
```

### insertBefore
Add a node before the head node.   
time complexity: $O(n)$
```js
const Twelve = root.find((n) => n.getValue() === 12);
root.insertBefore(Twelve, 1)
console.log(root.toArray()) // [1, 12, 41, 42] 
```

### insertAfter
Add a node after the giving node. 
time complexity: $O(1)$
```js
const Thirteen = root.find((n) => n.getValue() === 13);
root.insertAfter(Thirteen, 14)
// [1, 12, 13, 41, 42] 
// => 
// [1, 12, 13, 14 41, 42] 
```

### removeBefore
remove nodes before the giving node.  
time complexity: $O(n)$
```js
const FortyOne = root.find((n) => n.getValue() === 41);
root.removeBefore(FortyOne)
// [12, 13, 14, 41, 42, 43]
// => 
// [12, 13, 41, 42, 43]
```

### removeAfter
remove nodes after the giving node.  
time complexity: $O(1)$
```js
const Thirteen = root.find((n) => n.getValue() === 13);
root.removeAfter(Thirteen)
// [12, 13, 41, 42, 43]
// => 
// [12, 13, 42, 43]
```

### clear
clear the linkedlist. 

```js
root.clear();
console.log(root.getCount()) // 0
console.log(root.getHead()) // null
```
### LinkedList.fromArray
create a LinkedList from an Array.  

```js
const root2 = LinkedList.fromArray([1, 2, 3, 4, 5]);
```

## LinkedListNode

### setValue
set the value of the node.

### getValue
get the value of the node.

### setNext
set the next node.

### getNext
get the next node.

### hasNext
checks if node has a next node.

## DoubleLinkedList API
### use
constructor

```js
const root = new DoubleLinkedList();
```

### insertHead
inserts a node at the beginning of the DoubleLinkedList.  
time complexity: $O(1)$

```js
root.insertHead(2)
console.log(root.insertHead(1).getCount()) // 1
console.log(root.getCount()) // 2
console.log(root.toArray()) // [1, 2]
```

### insertTail
add a node at the end of the DoubleLinkedList.  
time complexity: $O(1)$ 
```js
root.insertTail(3)
console.log(root.getCount()) // 3
console.log(root.toArray()) // [1, 2, 3]
```
### insertAt
add a node at a specific position.  
time complexity: $O(n)$ 
```js
root.insertAt(0, 0)
root.insertAt(4, 4)
root.insertAt(2, 21)
console.log(root.getCount()) // 6
console.log(root.toArray()) // [0, 1, 21, 2, 3, 4]
```

### getCount
get the count of the DoubleLinkedList.  
 
```js
console.log(root.getCount()) // 6
```

### toArray
convert the doubleLinkedList into an array.
 
```js
console.log(root.toArray()) // [0, 1, 21, 2, 3, 4]
```
### isEmpty
check if the DoubleLinkedList is empty.  
 
```js
console.log(root.isEmpty()) // false
```

### getHead
get the head of doubleLinkedList.    
 
```js
console.log(root.getHead().getValue()) // 0
```
### getTail
get the tail of doubleLinkedList.    
 
```js
console.log(root.getTail().getValue()) // 4
```

### forEach
Traverses the list from beginning to end.     
 
```js
const arr = [];
root.forEach((node) => {
  const val = node.getValue();
  if (val > 9) arr.push(val);
});
console.log(arr) // [21]
```
### removeHead
remove the head of the DoubleLinkedList.      
time complexity: $O(1)$
```js
console.log(root.removeHead().getValue()) // 0
console.log(root.toArray()) // [1, 21, 2, 3, 4]
```
### removeTail
remove the tail of the DoubleLinkedList.      
time complexity: $O(1)$
```js
console.log(root.removeTail().getValue()) // 4
console.log(root.toArray()) // [1, 21, 2, 3]
```

### removeAt
remove a node at a specific position.       
time complexity: $O(n)$
```js
console.log(root.removeAt(2).getValue()) // 2
console.log(root.toArray()) // [1, 21, 3]
```

### find     
find the first node in the DoubleLinkedList based on a callback, get null if nothing is found. It also accepts a second param as the starting node to start searching from. 
```js
const num2 = root.find((n) => n.getValue() === 21);
console.log(num2.getValue()) // 21
```
### filter     
filter the linkedlist based on a callback, return a new LinkedList.  
```js
console.log(root.filter((n) => n.getValue() > 20).toArray()) // [21]
```

### clear     
clear the linkedlist.  
```js
root.clear();
console.log(root.getCount()) // 0
console.log(root.isEmpty()) // true
```

### DoubleLinkedList.fromArray()     
create a LinkedList from an Array.   
```js
console.log(DoubleLinkedList.fromArray(['a', 'b', 'c', 'd']).toArray())
// ['a', 'b', 'c', 'd']
```
## DoubleLinkedListNode
### setValue
set the value of the node.

### getValue
get the value of the node.

### setPrev
set the previous node.

### getPrev
get the previous node.

### hasPrev
check if node has a previous node.

### setNext
set the next node.

### getNext
get the next node.

### hasNext
check if node has a next node.

## License
[MIT](./LICENSE)
