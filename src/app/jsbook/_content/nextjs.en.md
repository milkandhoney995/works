# React Interview Questions

## 1. Next.js Basic

### Q: What is Next.js and why would you choose it over plain React?

**A:**

Next.js is a React framework that provides a production-ready setup with many built-in features out of the box. It eliminates the need to manually configure tools like bundlers or routing.

Compared to plain React, Next.js offers:

- File-based routing (the folder structure directly defines routes)
- Built-in API routes for backend logic
- Multiple rendering strategies (SSR, SSG, CSR)
- Automatic performance optimizations
- Image optimization with the Next.js Image component
- Code splitting and tree shaking by default

I would choose Next.js over plain React when I need better SEO, improved performance, server-side rendering, or a full-stack solution with minimal configuration.


---

### Q: What is the difference between SSR, SSG, and CSR?

**A:**

#### SSR (Server-Side Rendering)

- The page is rendered on the server for each request.
- The server generates HTML after a user accesses the page.
- The generated HTML is sent to the browser.
- Good for dynamic content that changes frequently.
- Improves SEO and initial load performance.

#### SSG (Static Site Generation)

- HTML is generated at build time using `next build`.
- The generated pages are served as static files.
- Very fast because no server-side computation is required at request time.
- Highly scalable.
- Suitable for content that does not change frequently, such as blogs or product listings.

#### CSR (Client-Side Rendering)

- The browser receives minimal HTML from the server.
- The page is built by executing JavaScript in the browser.
- Initial load may be slower because nothing is displayed until JavaScript finishes loading.
- After the initial load, navigation is usually very fast.
- A component becomes a Client Component in App Router when using `"use client"`, which enables client-side React features such as `useState` and `useEffect`.
- Suitable for highly interactive pages with frequent UI updates.


---

### Q: What is the difference between App Router and Pages Router?

**A:**

#### App Router

- Introduced in Next.js 13.
- Supports React Server Components.
- Enables nested layouts.
- Supports streaming and improved data fetching.
- Encourages better separation between server and client components.
- Uses React's modern architecture aligned with upcoming React features.

#### Pages Router

- The original routing system in Next.js.
- Uses `getServerSideProps`, `getStaticProps`, and `getInitialProps` for data fetching.
- Simpler and more familiar for traditional Next.js projects.
- Uses the React version defined in `package.json`.

In short, App Router is the newer, more powerful routing system with better performance and architectural improvements, while Pages Router represents the traditional approach.



## 2. Rendering

### Q: What is hydration?

**A:**

Hydration is the process where React attaches event listeners and restores interactivity to the server-rendered HTML.

When a page is pre-rendered on the server, the browser initially receives static HTML. After the JavaScript loads, React **hydrates** the page by attaching event handlers and making the UI interactive.

Without hydration, the page would remain static and non-interactive.


---

### Q: Why can hydration fail?

**A:**

Hydration can fail when the HTML generated on the server does not match the HTML generated on the client.

Common causes include:

- Using browser-only APIs (e.g., `window`, `localStorage`) during server rendering
- Rendering dynamic values like `Date.now()` or `Math.random()` on the server
- Conditional rendering that behaves differently between server and client

When a mismatch occurs, React throws a hydration error because it cannot safely attach event listeners to inconsistent DOM structures.


---

### Q: What are React Server Components?

**A:**

React Server Components (RSC) are components that are rendered on the server and do not send their JavaScript code to the client.

They allow you to:

- Fetch data directly from a database or API on the server
- Keep API keys and sensitive logic secure
- Reduce the amount of JavaScript sent to the browser
- Improve performance by minimizing client-side bundle size
- Stream content progressively from the server

Server Components cannot use client-side React features such as `useState` or `useEffect`.


---

### Q: What are the benefits of Server Components?

**A:**

The main benefits of Server Components are:

- Reduced JavaScript bundle size
- Better performance and faster initial load
- Improved security (sensitive logic stays on the server)
- Built-in data fetching without additional API layers
- Streaming support for faster perceived performance

By keeping as many components as possible as Server Components, we can significantly optimize performance and scalability.


---

### Q: When would you use `"use client"`?

**A:**

`"use client"` is required when a component needs client-side interactivity.

You should use it when:

- Managing state with `useState`
- Using lifecycle hooks like `useEffect`
- Handling user events (`onClick`, `onChange`, etc.)
- Using browser APIs such as `window`, `localStorage`, or `navigator.geolocation`
- Using custom hooks that depend on client-side behavior

In general, only components that require interactivity should be marked as Client Components.


---

### Q: What happens when a user accesses a Next.js page?

**A:**

When a user accesses a Next.js page using the App Router:

1. The server renders Server Components and generates an RSC payload (React Server Component Payload).
2. The server also generates HTML for the initial view.
3. The browser receives the HTML and displays it immediately.
4. The RSC payload is used to reconstruct the component tree on the client.
5. JavaScript for Client Components is downloaded and executed.
6. React hydrates the Client Components to enable interactivity.

For subsequent navigations:

- Next.js fetches and caches the RSC payload.
- Only necessary data and Client Component JavaScript are sent.
- Navigation becomes faster because a full page reload is not required.

In App Router, Server Components are rendered on the server, while Client Components are hydrated and executed in the browser.

## 3. Performance

### Q: How does Next.js optimize performance?

### Q: What is tree shaking?

### Q: How would you reduce bundle size?

## 4. Data Fetching

### Q: How does data fetching work in App Router?

### Q: What is ISR?

## 5. Architecture

### Q: How does Next.js handle routing?

### Q: What is middleware in Next.js?

## 6. Build and Deploy

### Q: What happens when you run `next build`?

### Q: How would you deploy a Next.js application?

## Other Questions

### Q: What is the difference between Node runtime and Edge runtime?

### Q: How does caching work in Next.js 13+?

## 8. Practical Questions

### Q: How would you structure a large Next.js project?

### Q: How would you handle authentication?