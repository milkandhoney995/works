# Events

## What are Events?
Events are actions or occurrences that happen in the browser, such as clicks, key presses, or page loads.

## Common Event Types
- `click`: Mouse click
- `keydown`: Keyboard key pressed
- `submit`: Form submission
- `change`: Input value changed

## Adding Event Listeners
Use `addEventListener` to respond to events:

```js
const button = document.querySelector('button');
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

## Removing Event Listeners
You can remove listeners with `removeEventListener`:

```js
function handleClick() {
  alert('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

## Event Object
Event handlers receive an event object with details:

```js
button.addEventListener('click', (event) => {
  console.log(event.target);
});
```

## Event Bubbling and Capturing
Events propagate through the DOM. Bubbling goes from child to parent; capturing goes from parent to child.

## Summary
Events are essential for interactive web pages. Use listeners to respond to user actions.