# Events

## What are Events?

Events are user actions or system changes that occur in a web page. JavaScript uses event listeners to respond to them.

## Common Events

### Mouse Events

| Event      | Description                |
|------------|----------------------------|
| `click`    | Element is clicked         |
| `dblclick` | Double-clicked             |
| `mousedown`| Mouse button pressed       |
| `mouseup`  | Mouse button released      |
| `mousemove`| Mouse moves                |
| `mouseenter`| Mouse enters element (no bubbling) |
| `mouseleave`| Mouse leaves element (no bubbling) |
| `mouseover`| Mouse enters element (bubbles) |
| `mouseout` | Mouse leaves element (bubbles) |

### Keyboard Events

| Event      | Description                |
|------------|----------------------------|
| `keydown`  | Key pressed (continuous)   |
| `keyup`    | Key released               |
| `keypress` | Key pressed (character keys only) |

### Form Events

| Event      | Description                |
|------------|----------------------------|
| `focus`    | Element gains focus        |
| `blur`     | Element loses focus        |
| `change`   | Value changed, loses focus |
| `input`    | Value changed (fires during input) |
| `submit`   | Form submitted             |
| `reset`    | Form reset                 |

### Window Events

| Event         | Description                  |
|---------------|-----------------------------|
| `load`        | Page finished loading        |
| `unload`      | Leaving page                 |
| `resize`      | Window size changed          |
| `scroll`      | Page scrolled                |
| `beforeunload`| Before leaving page          |

## Adding Event Listeners

Use `addEventListener` to respond to events.

```javascript
const button = document.querySelector('button');
button.addEventListener('click', (event) => {
  console.log('Button clicked!', event);
});
```

## Removing Event Listeners

Remove listeners with `removeEventListener`.

```javascript
function handleClick() {
  alert('Clicked!');
}
button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

## Event Object

Event handlers receive an event object with details.

```javascript
button.addEventListener('click', (event) => {
  console.log(event.target);
});
```

## Event Propagation

Events propagate through the DOM. Bubbling goes from child to parent; capturing goes from parent to child.

## Summary

Events are essential for interactive web pages. Use listeners to respond to user actions.