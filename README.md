This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


**Folder Structure (Next App Router)**
-
```
/src
  /app 
    layout.tsx
    /
      /components -> components for / page
      page.tsx
    /login
      /components -> components for /login page
      page.tsx
    /editor/[:id]
      /components -> components for /editor/[:id] page
      /page.tsx
  /components -> general components
  /utils
  /hooks
  /services
    /api
    /graphql
    /hooks

```

**Depedencies**
  -
  1. Tailwind Css -> Styling
  2. Partysocket -> Real time chats & real time update animation (https://github.com/silviaphungky/socket-animation](https://github.com/silviaphungky/socket-partykit)
  3. Zustand -> State management
  4. React Tan Query -> API fetcher
  5. @lottiefiles/react-lottie-player -> Lottie player
  6. MongoDB + NodeJs + ExpressJs -> service for keep track animation changes (https://github.com/silviaphungky/server-animation)

**Improvement Backlog**
-
1. Subscribe and Unsubscribe socket data based on animation ID
