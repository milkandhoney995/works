# DOM Manipulation

## What is the DOM?

The Document Object Model (DOM) is an API for manipulating HTML documents with JavaScript. By working with the DOM, you can dynamically change the content of web pages.

## DOM Structure

```
Document
  └── html
      ├── head
      │   ├── title
      │   └── meta
      └── body
          ├── header
          ├── main
          │   └── div
          │       ├── p
          │       └── button
          ├── aside
          └── footer
```

## Accessing Elements
You can access elements using methods like `getElementById`, `getElementsByClassName`, `querySelector`, and `querySelectorAll`.

### getElementById

Get an element by its ID.

```javascript
const element = document.getElementById('myId');
console.log(element);
```

**HTML:**
```html
<div id="myId">Content</div>
```

### querySelector

Get the first element matching a CSS selector.

```javascript
// By ID
const byId = document.querySelector('#myId');

// By class
const byClass = document.querySelector('.myClass');

// By tag name
const byTag = document.querySelector('div');

// Complex selector
const complex = document.querySelector('div.container #title');
```

### querySelectorAll

Get all elements matching a CSS selector.

```javascript
const items = document.querySelectorAll('.item');
items.forEach(item => {
  console.log(item);
});
```

## Modifying Elements

Change content, attributes, and styles.

```javascript
element.textContent = 'Hello!';
element.setAttribute('data-value', '123');
element.style.color = 'red';
```

## Creating and Removing Elements

Create new elements and add them to the DOM.

```javascript
const newDiv = document.createElement('div');
document.body.appendChild(newDiv);
```

Remove elements.

```javascript
document.body.removeChild(newDiv);
```

## Event Handling

Add event listeners to DOM elements.

```javascript
element.addEventListener('click', () => {
  alert('Clicked!');
});
```

## Summary

The DOM lets you interact with and modify web pages dynamically using JavaScript.