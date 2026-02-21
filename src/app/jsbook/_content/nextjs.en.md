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

---

### Q: Can Server Components use state?

**A:**

No, React Server Components (RSC) can't directly use state, or other client-side hooks like `useState`, `useReducer`, or `useEffect`.
RSC is designed to run only once on the server and send the resulting HTML to the client. It doesn't persist in the memory after the initial render and doesn't have the mechanisms for re-rendering based on UI or state changes.


---

### Q: What is the difference between RSC and SSR?

**A:**

React Server Components (RSC) are components, and SSR (Server-Side Rendering) is one of the rendering strategy.
RSCs are rendered on the server when a user accesses the page and do not send their JavaScript code to the client.
By contrast, in SSR, the page is rendered on the server for each request, and the server generates HTML after a user accesses the page. The generated HTML is sent to the browser.

---


### Q: What is partial rendering?

**A:**

Partial Prerendering (PPR) is the default behaviour of Cache Components. It is rendering optimization that combines static and dynamic rendering in a signal route. The static shell is served immediately while dynamic content streams ready in when ready, providing the best of both rendering strategies.

When Next.js renders components tree, if components don't access network resources (like certain system API), Cache components outputs is automatically added to the static shell, which is called prerendering. Prerendering generates a static shell consisting of HTML for initial page loads and a serialized RSC Payload for client-side navigation. It also ensures the browser receives fully rendered content instantly.

Next.js requires us to explicitly handle components that can't complete during prerendering. If they aren't wrapped in <Suspense> or marked with`use cache`, an Uncached data was accessed outside of <Suspense> error is thrown during development and build time.

---

## How does streaming improve performance?

**A:**

Streaming fastens perceived performance...
---


## 3. Performance

### Q: How does Next.js optimize performance?

**A:**

In Next.js, Cache Components can optimize performance by ensuring fresh data fetching during the runtime.
A common cause of large client bundles is doing expensive rendering work in Client Components, which often happens with libraries that exist only to transform data into UI, such as syntax highlighting, chart rendering, or markdown parsing. If that work does not require browser APIs or user interaction, it can be run in a Server Component.
Also, package bundling should optimize performance. If a large module is identified through analysis, it's good to optimize package in `next.config.js`.


### Q: What is tree shaking?

Tree shaking is the process of removing the unused code from the JavaScript bundles during build time. Next.js automatically tree-shakes code to reduce bundle sizes.

### Q: How would you reduce bundle size?

It reduces bundle size keeping as many components as possible as Server Components. It is because that RSC reduces the amount of JavaScript sent to the browser.
Also, package bundling should reduce bundle size.

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