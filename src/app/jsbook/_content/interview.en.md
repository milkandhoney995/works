# JavaScript Interview Questions

## Variable Declarations
Explain the difference between `var`, `let`, and `const`.

## Scope
What is scope in JavaScript? How does function scope differ from block scope?

## Closures
What is a closure? Give an example.

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Async Functions
How do you handle asynchronous operations in JavaScript?

- Callbacks
- Promises
- Async/Await

## Example:
```js
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

## Common Pitfalls
- Hoisting
- `this` keyword
- Type coercion

## Summary
Prepare for interviews by understanding core JavaScript concepts and practicing coding problems.