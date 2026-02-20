# JavaScript Basics

Learn the fundamental syntax and important concepts in JavaScript.

## Variable Declaration

There are 3 ways to declare variables in JavaScript.

```javascript
// var - Function scope (old method)
var name = "John";

// let - Block scope (recommended)
let age = 25;

// const - Constant (default choice)
const pi = 3.14159;
```

**Best Practice**: Default to `const`, use `let` when you need reassignment. Avoid `var` altogether.

## Data Types

JavaScript has the following primitive types:

```javascript
// String
const message = "Hello, World!";
const template = `Hello, ${name}`;

// Number
const integer = 42;
const decimal = 3.14;
const negative = -100;

// Boolean
const isActive = true;
const isEmpty = false;

// Null and Undefined
const empty = null; // Intentionally empty
let uninitialized; // undefined (not initialized)

// Symbol
const unique = Symbol('id');

// BigInt
const largeNumber = 9007199254740991n;
```

## Operators

```javascript
// Arithmetic operators
10 + 5;    // 15
10 - 5;    // 5
10 * 5;    // 50
10 / 5;    // 2
10 % 3;    // 1 (remainder)
2 ** 3;    // 8 (exponentiation)

// Comparison operators
5 === 5;      // true (strict equality)
5 == "5";     // true (equality with type coercion)
5 !== "5";    // true (strict inequality)

// Logical operators
true && false;   // false (AND)
true || false;   // true (OR)
!true;           // false (NOT)
```

## Control Flow

### if/else Statements

```javascript
const age = 20;

if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}
```

### switch Statement

```javascript
const day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  default:
    dayName = "Other";
}
```

### Loops

```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while loop
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// do-while loop
let x = 0;
do {
  console.log(x);
  x++;
} while (x < 5);

// for-of loop (iterate over array values)
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
  console.log(fruit);
}

// for-in loop (iterate over object keys)
const person = { name: "John", age: 25 };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

## Functions

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}`;
}

// Function expression
const add = function(a, b) {
  return a + b;
};

// Arrow function (ES6+)
const multiply = (a, b) => a * b;

// Default parameters
const sayHello = (name = "Guest") => {
  return `Hello, ${name}`;
};

// Rest parameters (variadic)
const sum = (...numbers) => {
  return numbers.reduce((a, b) => a + b, 0);
};
```

## Scope

```javascript
const globalVar = "global";

{
  const blockVar = "block";
  console.log(globalVar); // OK
  console.log(blockVar);  // OK
}

console.log(globalVar);   // OK
console.log(blockVar);    // ReferenceError
```

## Objects and Arrays

```javascript
// Object
const user = {
  name: "John",
  age: 25,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

// Array
const colors = ["red", "blue", "green"];
console.log(colors[0]); // "red"
console.log(colors.length); // 3
```

## Summary

Understanding JavaScript fundamentals is crucial for writing more complex code. Master these concepts before moving to the next level.
