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

### Q: What are React Server Components?

### Q: When would you use use client?

### Q: What happens when a user accesses a Next.js page?

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
### Q: What is hydration and why can it fail?

### Q: What is the difference between Node runtime and Edge runtime?

### Q: How does caching work in Next.js 13+?

## 8. Practical Questions

### Q: How would you structure a large Next.js project?

### Q: How would you handle authentication?