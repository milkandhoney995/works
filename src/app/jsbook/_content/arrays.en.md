# Arrays and Methods

## Basic

### Creating an Array
```javascript
// Literal notation
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];

// Mixed types
const mixed = [1, 'two', true, null, undefined];

// Array constructor
const arr3 = new Array(3);  / Array with 3 empty slots
const arr4 = new Array(1, 2, 3); // [1, 2, 3]

// Empty array
const empty = [];
```

### properties
```javascript
const arr = [1, 2, 3, 4, 5];

// length
console.log(arr.length); // 5

// Access by index
console.log(arr[0]); // 1
console.log(arr[arr.length - 1]); // 5

// Add an element by index
arr[5] = 6;
console.log(arr); // [1, 2, 3, 4, 5, 6]
```

## Alering Array

### push / pop
```javascript
const arr = [1, 2, 3];

// Add an element
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// Add multiple elements
arr.push(5, 6);
console.log(arr); // [1, 2, 3, 4, 5, 6]

// Remove the last element
const last = arr.pop();
console.log(last); // 6
console.log(arr); // [1, 2, 3, 4, 5]
```

### shift / unshift
```javascript
const arr = [1, 2, 3];

// Remove the first element
const first = arr.shift();
console.log(first); // 1
console.log(arr); // [2, 3]

// Add an element to index 0
arr.unshift(0);
console.log(arr); // [0, 2, 3]

// Add multiple elements to the beginning
arr.unshift(-2, -1);
console.log(arr); // [-2, -1, 0, 2, 3]
```

### splice

Insert or delete elements at a specific index.

```javascript
const arr = [1, 2, 3, 4, 5];

// Delete 2 elements from index 2
arr.splice(2, 2);
console.log(arr); // [1, 2, 5]

// Insert elements at index 1
arr.splice(1, 0, 'a', 'b');
console.log(arr); // [1, 'a', 'b', 2, 3, 4, 5]

// Remove 2 elements from index 1 and insert a new element
arr.splice(1, 2, 'x');
console.log(arr); // [1, 'x', 4, 5]
```

### sort
```javascript
const arr = [3, 1, 4, 1, 5];

// Sort in lexicographical (default) order
arr.sort();
console.log(arr); // [1, 1, 3, 4, 5]

// Sort numbers in ascending order
const numbers = [10, 5, 40, 25];
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 10, 25, 40]

// Sort numbers in descending order
numbers.sort((a, b) => b - a);
console.log(numbers); // [40, 25, 10, 5]

// Sort an array of objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
];

users.sort((a, b) => a.age - b.age);
// [{ name: 'Jane', age: 25 }, ...]
```

### reverse

```javascript
const arr = [1, 2, 3, 4, 5];

arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

## Methods That Do NOT Modify the Original Array

### slice

Returns a shallow copy of a portion of an array.

```javascript
const arr = [1, 2, 3, 4, 5];

// From index 1 up to (but not including) index 3
const sliced = arr.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5] (original array unchanged)

// Last 2 elements
const last2 = arr.slice(-2);
console.log(last2); // [4, 5]

// Copy the entire array
const copy = arr.slice();
console.log(copy); // [1, 2, 3, 4, 5]
```

### concat

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const combined = arr1.concat(arr2, arr3);
console.log(combined); // [1, 2, 3, 4, 5, 6]
console.log(arr1); // [1, 2] (original array unchanged)
```

### join

```javascript
const arr = ['apple', 'banana', 'orange'];

// Default: comma-separated
console.log(arr.join()); // "apple,banana,orange"

// Custom separator
console.log(arr.join('-')); // "apple-banana-orange"
console.log(arr.join(' ')); // "apple banana orange"

// Empty string
console.log(arr.join('')); // "applebananaorange"
```

## Iteration Methods

### forEach

```javascript
const arr = ['a', 'b', 'c'];

arr.forEach((item, index, array) => {
  console.log(`${index}: ${item}`);
});
// 0: a
// 1: b
// 2: c
```

### map

```javascript
const numbers = [1, 2, 3, 4, 5];

const squared = numbers.map((n) => n * n);
console.log(squared); // [1, 4, 9, 16, 25]

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// More complex example
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
];

const names = users.map((user) => user.name);
console.log(names); // ['John', 'Jane']
```

### filter

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const moreThanThree = numbers.filter((n) => n > 3);
console.log(moreThanThree); // [4, 5, 6]

// Array of objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 35 },
];

const adults = users.filter((user) => user.age >= 30);
// [{ name: 'John', age: 30 }, { name: 'Bob', age: 35 }]
```

### reduce

```javascript
const numbers = [1, 2, 3, 4, 5];

// Calculate sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Calculate product
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// Convert array to object
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
];

const userMap = users.reduce((acc, user) => {
  acc[user.id] = user.name;
  return acc;
}, {});
console.log(userMap); // { 1: 'John', 2: 'Jane' }

// Multi-line example
const result = [1, 2, 3, 4, 5].reduce((acc, n, index) => {
  console.log(`Iteration: acc=${acc}, n=${n}, index=${index}`);
  return acc + n;
}, 0);
console.log('Final result:', result);
```

### find

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

const user = users.find((u) => u.name === 'Jane');
console.log(user); // { id: 2, name: 'Jane' }

const notFound = users.find((u) => u.name === 'Alice');
console.log(notFound); // undefined
```

### findIndex

```javascript
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];

const index = users.findIndex((u) => u.name === 'Jane');
console.log(index); // 1
```

### some

Returns true if at least one element satisfies the condition.

```javascript
const numbers = [1, 2, 3, 4, 5];

const hasEven = numbers.some((n) => n % 2 === 0);
console.log(hasEven); // true

const hasNegative = numbers.some((n) => n < 0);
console.log(hasNegative); // false
```

### every

Returns true if all elements satisfy the condition.

```javascript
const numbers = [2, 4, 6, 8];

const allEven = numbers.every((n) => n % 2 === 0);
console.log(allEven); // true

const numbers2 = [2, 4, 5, 8];
const allEven2 = numbers2.every((n) => n % 2 === 0);
console.log(allEven2); // false
```

### flatMap

Maps each element and flattens the result by one level.

```javascript
const arr = [1, 2, 3];

const result = arr.flatMap((n) => [n, n * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]
```

## Search Methods

### indexOf / lastIndexOf

```javascript
const arr = ['a', 'b', 'c', 'b', 'd'];

console.log(arr.indexOf('b')); // 1 (first index)
console.log(arr.lastIndexOf('b')); // 3 (last index)
console.log(arr.indexOf('e')); // -1 (not found)

const numbers = [1, 2, 3, 2, 1];
console.log(numbers.indexOf(2)); // 1
```

### includes

```javascript
const arr = ['apple', 'banana', 'orange'];

console.log(arr.includes('banana')); // true
console.log(arr.includes('grape')); // false

const numbers = [1, 2, 3, NaN];
console.log(numbers.includes(2)); // true
console.log(numbers.includes(NaN)); // true（different from indexOf）
```

## Flattening Arrays

### flat

```javascript
const nested = [1, [2, 3], [4, [5, 6]]];

// Flatten one level
console.log(nested.flat()); // [1, 2, 3, 4, [5, 6]]

// Flatten all levels
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
```

## Practical Examples

### Data Filtering

```javascript
const products = [
  { id: 1, name: 'A', price: 100, category: 'electronics' },
  { id: 2, name: 'B', price: 50, category: 'books' },
  { id: 3, name: 'C', price: 150, category: 'electronics' },
  { id: 4, name: 'D', price: 75, category: 'books' },
];

// Filter electronics priced at 100 or more, then sort by price descending
const filtered = products
  .filter((p) => p.category === 'electronics' && p.price >= 100)
  .sort((a, b) => b.price - a.price);

console.log(filtered);
// [{ id: 3, name: 'C', price: 150, category: 'electronics' }]
```

### Data Transformation

```javascript
const users = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
];

const transformed = users.map((user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
}));

console.log(transformed);
// [
//   { id: 1, firstName: 'John', lastName: 'Doe', fullName: 'John Doe' },
//   { id: 2, firstName: 'Jane', lastName: 'Smith', fullName: 'Jane Smith' },
// ]
```

## Summary

- **Add / Remove**: push, pop, shift, unshift, splice
- **Transform**: map, filter, reduce
- **Search**: find, findIndex, some, every, includes
- **Others**: slice, concat, join, sort, reverse
- **Iteration**: Choose between forEach, map, filter, and reduce depending on your purpose