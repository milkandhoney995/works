# Advanced JavaScript Topics

## Prototypes and Inheritance
JavaScript uses prototypes for inheritance. Objects inherit properties and methods from their prototype.

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
};
const dog = new Animal('Dog');
dog.speak(); // Dog makes a sound.
```

## Asynchronous Programming
JavaScript handles async operations with callbacks, promises, and async/await.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

## ES6+ Features
- Arrow functions
- Template literals
- Destructuring
- Spread/rest operators
- Classes

## Modules
JavaScript supports modules for code organization:

```js
// math.js
export function add(a, b) {
  return a + b;
}
// main.js
import { add } from './math.js';
```

## Error Handling
Use try/catch for error handling:

```js
try {
  throw new Error('Something went wrong');
} catch (e) {
  console.error(e);
}
```

## Summary
Advanced JavaScript covers inheritance, async programming, modern syntax, modules, and error handling.