# JavaScript Interview Questions

Below are common questions and detailed answers/code examples often asked in frontend JavaScript interviews.

---

## 1. JavaScript Event Loop

### Q: What is the JavaScript event loop? Explain the actual execution order.

**A:** JavaScript runs on a single thread, and the event loop manages the call stack and task queues (microtask/macrotask) to handle asynchronous processing.

**Execution Order (Important):**

1. **Call Stack**: Executes all synchronous code
2. **Microtask Queue**: Handles Promise.then(), queueMicrotask(), etc.
3. **Macrotask Queue**: Handles setTimeout(), setInterval(), I/O, etc.

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('6. setTimeout (macrotask)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3. Promise.then (microtask)');
  })
  .then(() => {
    console.log('5. Second Promise.then');
  });

queueMicrotask(() => {
  console.log('4. queueMicrotask (microtask)');
});

console.log('2. End sync code');

// Output order:
// 1. Start
// 2. End sync code
// 3. Promise.then (microtask)
// 4. queueMicrotask (microtask)
// 5. Second Promise.then
// 6. setTimeout (macrotask)
```

**Remember the priority: microtask > macrotask!**

---

## 2. Performance Optimization

### Q: What is the difference between reflow and repaint? How can you optimize them?

**A:**
- **Reflow**: Recalculates layout (position/size) of elements. **Very costly**
- **Repaint**: Redraws visual styles (color/background). Less costly than reflow

---

## 3. Variable Declarations

Explain the difference between `var`, `let`, and `const`.

---

## 4. Scope

What is scope in JavaScript? How does function scope differ from block scope?

---

## 5. Closures

What is a closure? Give an example.

```javascript
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

---

## 6. Async Functions

How do you handle asynchronous operations in JavaScript?

- Callbacks
- Promises
- Async/Await

**Example:**
```javascript
async function fetchData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
```

---

## 7. Common Pitfalls
- Hoisting
- `this` keyword
- Type coercion

---

## Summary
Prepare for interviews by understanding core JavaScript concepts and practicing coding problems.