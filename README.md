# Aura Chat - Modern Realtime Messenger

A production-quality frontend application built with **Next.js 16+ (App Router)**, **TypeScript**, and **Tailwind CSS v4**. This project integrates a high-performance chat system connected to live REST and WebSockets endpoints, alongside a creative SaaS product introduction landing page.

---

## Project Overview

Aura Chat is designed to showcase modern messenger aesthetics (similar to Telegram and Discord) with strong engineering underpinnings. The app supports seamless phone-number authentication, real-time message exchange via WebSockets, group channels with admin governance, infinite cursor history pagination, and smart viewport scroll behavior.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router with React Server Components)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (Global UI and Auth sessions)
- **Data Fetching & Cache**: TanStack React Query v5 & Axios
- **Form Handling**: React Hook Form & Zod Schema Validation
- **Real-Time Delivery**: Socket.io Client
- **Icons & Animation**: Lucide React & Framer Motion

---

## Key Features

1. **Passwordless Auth**: Single-step E.164 phone authentication. Registrations are automatically created for new numbers.
2. **Global Directory Search**: Real-time debounced queries search the backend for other registered users by phone or name.
3. **1-to-1 & Group Chats**: Toggle between direct text sessions and group channels.
4. **Group Admin Operations**: Admins can edit group names, promote participants, invite new members, or remove/leave members.
5. **Real-time Live Sync**: Instant delivery over WebSockets (`message:new` event) updates React Query cache and conversation lists instantly.
6. **Smart Scrolling Viewport**: Initially scrolls to the bottom on load/send. Prevents viewport jumps while browsing history. Displays a floating "New Messages" banner if messages arrive while reading older history.
7. **Infinite Pagination**: Automatic cursor pagination fetches older messages on scroll-to-top using the oldest message ID as cursor.
8. **Responsive Layouts**: Double-panel split screen on desktop, with fluid slide transitions and layout toggles on mobile viewports.

---

## Installation & Running Locally

### Prerequisites
- Node.js (v18.0.0 or higher, Node 24 recommended)
- npm or yarn

### 1. Clone the project and install dependencies
```bash
# Go to project directory
cd chat-landing-app

# Install packages
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the Landing Page. Go to `/login` to access the chat login screen.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Architecture

A **feature-based folder structure** is used inside the `src/` directory to separate concerns:

```
src/
├── app/                  # Next.js Router routes and page definitions
│   ├── (chat)/           # Chat dashboard and login route grouping
│   ├── (landing)/        # Root landing page representation
│   ├── layout.tsx        # Global HTML wrapper
│   └── providers.tsx     # TanStack Query + Socket contexts
├── components/           # Reusable UI elements (primitives)
├── features/             # Feature blocks encapsulating logical views
│   ├── auth/             # Login view logic
│   ├── chat/             # Message Area, Sidebar, and Group Modals
│   └── landing/          # Hero, mockup demo, showcases
├── hooks/                # Custom utility hooks (useDebounce, useSocket)
├── lib/                  # Configurations (Axios client config)
├── services/             # API services mapping REST requests
├── store/                # Zustand global client UI states
└── types/                # Strict TypeScript declaration types
```

---

## API Documentation Summary

The API leverages standard REST endpoints along with Socket.io messages:
- **Auth**: `POST /auth/login` (login/register), `GET /auth/me` (profile check)
- **Users**: `GET /users/search?q={query}` (directory search)
- **Conversations**: `GET /conversations` (list channels), `POST /conversations` (start 1-to-1), `POST /conversations/group` (create group)
- **Group Options**: `PATCH /conversations/{id}` (rename), `POST /conversations/{id}/participants` (add members), `DELETE /conversations/{id}/participants/{userId}` (remove/leave), `POST /conversations/{id}/admins` (promote admin)
- **Messages**: `GET /conversations/{id}/messages?limit={limit}&before={cursor}` (history), `POST /messages` (send text)
- **WebSocket Handshake**: Pass token as `{ auth: { token } }`.
- **WebSocket Events**: Client emits `message:send`. Server emits `message:new` and `conversation:updated`.

---

## 💭 Thought Process

### 1. Why this architecture was chosen
We opted for a feature-based layout because it makes the app maintainable and modular. Separating the API services (`src/services/`) and global stores (`src/store/`) from the UI pages prevents prop drilling and separates business logic from presentational rendering.

### 2. Major Library Selections
- **Zustand**: Selected for global UI/Auth states instead of Redux due to its extremely low boilerplate and simplicity in Next.js CSR.
- **TanStack Query (React Query)**: Crucial for managing asynchronous query states, caching conversation history, and handling cursor paginations. It integrates cleanly with websockets, allowing us to manually edit cache states on event arrivals.
- **React Hook Form & Zod**: Standard for type-safe form validations. Prevents invalid payloads from reaching the API server.
- **Framer Motion**: Enables smooth tab switches and micro-interactions on the landing page, aligning with modern premium SaaS products.

### 3. Trade-offs Considered
- **Websockets vs HTTP REST for Sending**: We chose to send messages via REST (`POST /messages`) and receive incoming messages via WebSocket (`message:new`). Although we could have emitted `message:send` on the socket, sending via HTTP REST gives us immediate, synchronous response payloads (making optimistic UI rollback and promise rejection catch paths cleaner).
- **Client Component vs Server Component**: The landing page is animated and interactive, so it runs as a client component to support Framer Motion and live tickers. For SEO, metadata is exported separately as a Server Component parameter in `layout.tsx`.

### 4. Landing Page Design Reasoning
A dark "glassmorphism" SaaS layout was chosen, showcasing a live simulated chat feed that matches the colors and UI of the actual messenger. This establishes a strong visual identity.

### 5. AI Tool Usage & Manual Modifications
- AI was used to draft initial skeletons of components.
- **Manual changes**:
  1. We explicitly reconfigured the TanStack Query `useInfiniteQuery` settings, casting pageParams and overriding the `onSuccess` mutations to ensure standard v5 options compile correctly.
  2. We manually added scroll anchoring checks in `ChatArea.tsx` to prevent message list shifting when cursor pages load.
  3. Fixed a critical closure/timer race condition in the landing page's simulated chat ticker loop where React's async state evaluation would read out-of-bounds indices. We resolved this by capturing the current state value synchronously before updating states and simplifying overlapping timeout loops.

### 6. API Issues Encountered & Workarounds
- **Inconsistent Conversation Objects**: Direct chats return a single `participant` object, whereas groups return a `participants` array. We addressed this with typescript unions and distinct conditional branches in the sidebar and chat panels.
- **Group Member Limits**: The backend returns a validation error if a group is created with fewer than 3 total participants. We added frontend validation inside `GroupModal` to enforce selecting at least 2 other colleagues before submitting the request.
