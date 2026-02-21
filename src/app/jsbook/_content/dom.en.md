# DOM Manipulation

## What is the DOM?
The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a page as a tree of objects.

## Accessing Elements
You can access elements using methods like `getElementById`, `getElementsByClassName`, `querySelector`, and `querySelectorAll`.

```js
const element = document.getElementById('myId');
const items = document.querySelectorAll('.item');
```

## Modifying Elements
You can change content, attributes, and styles:

```js
element.textContent = 'Hello!';
element.setAttribute('data-value', '123');
element.style.color = 'red';
```

## Creating and Removing Elements
Create new elements and add them to the DOM:

```js
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);
```
Remove elements:

```js
document.body.removeChild(newDiv);
```

## Event Handling
You can add event listeners to DOM elements:

```js
element.addEventListener('click', () => {
  alert('Clicked!');
});
```

## Summary
The DOM allows you to interact with and modify web pages dynamically using JavaScript.