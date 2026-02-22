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

## 2-1. Performance & Advanced Rendering

### Q: Can Server Components use state?

**A:**

No, React Server Components (RSC) cannot use client-side state or effects such as `useState`, `useReducer`, or `useEffect`.

Server Components run only on the server and generate a serialized component payload. They do not persist in the browser and do not re-render in response to client-side interactions.

If interactivity or state is required, the component must be marked with `"use client"` and become a Client Component.


---

### Q: What is the difference between RSC and SSR?

**A:**

React Server Components (RSC) and Server-Side Rendering (SSR) are related but fundamentally different concepts.

- **RSC** is a component model. Server Components are rendered on the server and do not send their JavaScript code to the client.
- **SSR** is a rendering strategy. It generates HTML on the server for each request and sends that HTML to the browser.

With SSR, the full React application (including client-side JavaScript) is still sent to the browser for hydration.

With RSC, only Client Components send JavaScript to the browser. Server Components remain server-only, which reduces bundle size.

In short:
- SSR = how a page is rendered.
- RSC = where a component runs.


---

### Q: What is partial rendering (Partial Prerendering)?

**A:**

Partial Prerendering (PPR) is a rendering strategy that combines static and dynamic content in a single route.

Next.js generates a static shell at build time for parts of the page that can be pre-rendered. Dynamic parts are streamed from the server when they are ready.

This allows:

- Fast initial page load (static shell)
- Progressive streaming of dynamic content
- Better perceived performance

When dynamic data cannot be resolved during prerendering, it must be wrapped in `<Suspense>` so that Next.js can stream it properly.

PPR combines the benefits of static rendering and dynamic rendering.


---

### Q: How does streaming improve performance?

**A:**

Streaming improves perceived performance by sending parts of the UI to the browser as soon as they are ready, instead of waiting for the entire page to finish rendering.

This means:

- The user sees content earlier.
- The static layout appears immediately.
- Slow data fetching does not block the entire page.

Streaming reduces Time to First Byte (TTFB) impact and improves user experience, especially for pages with slow API calls.


---

## 3. Performance

### Q: How does Next.js optimize performance?

**A:**

Next.js optimizes performance through several mechanisms:

- Automatic code splitting
- Tree shaking
- React Server Components (reducing client-side JavaScript)
- Static optimization (SSG)
- Image optimization
- Streaming and Suspense support
- Built-in caching for data fetching

Additionally, moving heavy logic (such as markdown parsing or data transformation) into Server Components can significantly reduce client bundle size.

Bundle analysis tools can help identify large dependencies that should be optimized or replaced.


---

### Q: What is tree shaking?

**A:**

Tree shaking is the process of removing unused JavaScript code during the build step.

Modern bundlers such as Webpack analyze ES module imports and exclude code that is not used in the application.

This reduces the final bundle size and improves load performance.


---

### Q: How would you reduce bundle size?

**A:**

To reduce bundle size:

- Keep as many components as possible as Server Components.
- Avoid large client-side libraries unless necessary.
- Use dynamic imports for heavy components.
- Remove unused dependencies.
- Analyze bundle size using build tools.
- Ensure tree shaking works correctly by using ES modules.

Reducing client-side JavaScript improves initial load performance and overall user experience.

## 4. Data Fetching

### Q: How does data fetching work in App Router?

**A:**

In the App Router, data fetching works differently for Server Components and Client Components.

---

#### In Server Components:

- Data fetching is done directly on the server.
- You can use asynchronous I/O such as:
  - The built-in `fetch` API
  - An ORM or direct database queries
  - Reading from the filesystem using Node.js APIs
- By default, `fetch` is cached in Next.js.
- Caching behavior can be controlled using:
  - `cache: "no-store"` (dynamic rendering)
  - `revalidate` (time-based revalidation)

Because Server Components run only on the server, sensitive data such as API keys or database credentials are never exposed to the client.

Server-side data fetching is generally preferred for performance and security reasons.

---

#### In Client Components:

Data fetching happens in the browser and is used when interactivity or real-time updates are required.

There are several approaches:

1. **Using `useEffect` with `fetch`**
   - Traditional client-side data fetching.
   - Suitable when data depends on user interaction.

2. **Using data fetching libraries**
   - Libraries like SWR or React Query provide caching, revalidation, and state management.

3. **Using React’s `use` hook (with Suspense)**

   - The `use` hook allows a Client Component to read a Promise.
   - Typically used when a Server Component passes a Promise as a prop.
   - Must be used with `<Suspense>`.

Example pattern:

- A Server Component creates a Promise.
- The Promise is passed to a Client Component.
- The Client Component calls `use(promise)` to read the resolved value.

This pattern enables streaming and progressive rendering.

---

#### When should you fetch on the server vs client?

- Fetch on the **server** when:
  - Data is required for initial render
  - SEO is important
  - Sensitive logic must remain secure
  - You want to reduce client-side JavaScript

- Fetch on the **client** when:
  - Data depends on user interaction
  - Real-time updates are required
  - You need browser-only APIs

## 5. Architecture

### Q: How does Next.js handle routing?

**A:**

Next.js uses file-based routing.

In the App Router:

- Each folder inside the `app` directory represents a URL segment.
- A route becomes accessible when a folder contains a `page.tsx` file.
- `layout.tsx` defines shared UI for a route segment and its children.
- Nested folders create nested routes automatically.

For dynamic routing:

- Square brackets are used for dynamic segments (e.g., `[id]`).
- Catch-all routes can be defined using `[...slug]`.

Route groups (parentheses syntax) allow organizing files without affecting the URL.

This file-based approach makes routing declarative and closely aligned with the project structure.

---

### Q: What is Proxy in Next.js?

**A:**

In Next.js 16 and later, `proxy` replaces the older middleware convention. A **proxy file** runs code on the server (or Edge runtime) before a request is fully handled by a route or page.

It enables you to intercept and modify requests or responses early in the routing pipeline.

Proxy is typically used for:

- Authentication and authorization checks
- Redirects and rewrites
- Modifying request or response headers
- Logging, analytics, or A/B testing

Proxy runs before rendering and applies to routes based on its placement and configuration.

In summary:

- Proxy handles request-level logic
- Route handlers and Server Components handle rendering and data fetching

---

## Q: What are Route Handlers?

**A:**

Route Handlers allow us to create custom backend endpoints inside the `app` directory, typically under `app/api`.

They are the App Router equivalent of traditional API routes.

Key characteristics:

- They support standard HTTP methods such as `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`.
- They use the Web Request/Response API.
- We can use `NextRequest` and `NextResponse` to access Next.js-specific features.

For example, using `NextResponse` we can:

- Return JSON responses
- Set cookies
- Perform redirects
- Perform rewrites

Route Handlers are typically used for:

- Handling form submissions
- Authentication flows
- Server-side data processing
- Acting as a backend for client components

Unlike Proxy, Route Handlers are designed for full request handling and data processing.

---

## Q: Does Proxy run on Node or Edge?

**A:**

Proxy runs on the **Edge Runtime** by default.

The Edge Runtime is optimized for low-latency execution at the network edge and supports Web standard APIs, but not full Node.js APIs.

---

## Q: Can Proxy read request bodies?

**A:**

Proxy can access the request object, but it is not designed for heavy request body processing.

Because Proxy runs on the Edge Runtime:

- It supports standard Web APIs.
- However, reading and processing large request bodies is discouraged.
- It is primarily intended for lightweight request interception, such as authentication checks or redirects.

For full body parsing or complex logic, Route Handlers are more appropriate.

---

## Q: What are the limitations of Proxy handlers?

**A:**

Proxy has several important limitations:

- Runs only on the Edge Runtime (no native Node.js APIs).
- Not suitable for heavy data fetching or database operations.
- Not ideal for complex session management.
- Limited execution time compared to Node runtime environments.

Proxy should be used for lightweight request-level logic such as:

- Authentication gating
- Header manipulation
- Redirects and rewrites
- A/B testing

Heavy business logic should be handled in Route Handlers or backend services.

---

## Q: When should you choose Proxy vs redirects?

**A:**

Use **Proxy** when:

- Redirect logic depends on runtime conditions (e.g., cookies, headers, authentication state).
- You need to inspect or modify the request before routing.

Use the `redirects` option in `next.config.js` when:

- Redirects are static and deterministic.
- No runtime logic is required.
- You want better performance and simpler configuration.

In short:

- `redirects` → static configuration
- `proxy` → dynamic request-level logic

---

## Q: What is the difference between Node runtime and Edge runtime?

**A:**

Both are server runtimes in Next.js, but they differ significantly.

#### Node Runtime

- Default runtime for Route Handlers and Server Components.
- Full access to Node.js APIs.
- Suitable for database access and heavy computation.
- Supports features like ISR (Incremental Static Regeneration).

#### Edge Runtime

- Lightweight runtime based on Web standard APIs.
- No access to native Node.js modules.
- Optimized for low-latency global execution.
- Used by Proxy by default.
- Does not support some Node-dependent features like ISR.

In summary:

- Node runtime → full backend capability
- Edge runtime → fast, lightweight request interception

---

## 6. Build and Deploy

### Q: What happens when you run `next build`?

### Q: How would you deploy a Next.js application?

## 7. Practical Questions

### Q: How does caching work in Next.js 13+?

### Q: How would you structure a large Next.js project?

### Q: How would you handle authentication?