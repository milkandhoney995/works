# React Interview Questions

## 1. Next.js Basic

### Q: What is Next.js and why would you choose it over plain React?

**A:** Next.js is a React framework that set configurations automatically and includes useful package. Next.js is more convinient than plain React, since routing structure directly reflects folder structure, has build-in API routes, meets three rendering approaches: SSR/SSG/CSR, and optimizes the image size with Next's Image component.

### Q: What is the difference between SSR, SSG, and CSR?

**A:**<br />
SSR(Server Side Rendering) is:
- Next.js pre-rendering function
- In SSR, server generates HTML after page is accessed, and send HTML to the browser
SSG(Static Site Generation) is:
- Next.js another pre-rendering function
- In SSG, HTML is generated during `next build`, which makes page speed very fast
- High scalability as no server processing is required
- SSG should be choosen for infrequently updated content or Pages with pre-defined content(product lists, blogs, etc.)
CSR(Client Side Rendering) is:
- build pages in the browser
- Browser loads almost empty HTML recieved from server, and build page by running JavaScript
- Initial display is slow, nothing is displayed until JavaScript loading finishes
- Once the JavaScript is loaded, subsequent page transitions are very fast.
- Component becomes client component (= CSR) with `use client`, which enable component to use client-only React features, like `useState` or `useEffect`
- CSR should be choosen for highly interactive pages(UI with frequent mouse operations and dynamic displays, etc)

### Q: What is the difference between App Router and Pages Router?

**A:** <br />
App Router is:
- support new React function such as Server Componets
- uses React canary build-in, which includes all the stable changes in React 19, and new features that are validated in the framework before a new React release.
Page Router is:
- an original router
- use React version installed in project's package.json



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