# Personalized Content Dashboard  
### Software Development Engineer (SDE) Intern – Frontend Assignment

A fully functional, scalable, and interactive content aggregation dashboard built using modern frontend technologies including Next.js, React, TypeScript, Redux Toolkit, and Tailwind CSS.

This project was developed as part of an SDE Intern Frontend assignment to demonstrate frontend architecture, state management, API integration, UI complexity, performance optimization, and testing capabilities.

---

## 🚀 Live Demo

> Add deployed link here (if available)

---

## 📂 GitHub Repository

> Add repository link here

---

# 📌 Project Overview

The **Personalized Content Dashboard** is a dynamic, user-centric web application that allows users to:

- Configure preferred content categories
- View a unified personalized content feed
- Explore trending content
- Mark and manage favorites
- Search across multiple content types
- Reorder feed content via drag-and-drop
- Toggle between dark and light modes
- Experience smooth animations and responsive layouts

The dashboard simulates a real-world content aggregation platform by integrating multiple APIs (news, recommendations, and social feed simulation) into one seamless interface.

---

# 🧠 Core Features

## 1️⃣ Personalized Content Feed

Users can configure preferred categories (e.g., Technology, Sports, Finance, Entertainment).

- Preferences stored using Redux Toolkit
- Persisted in `localStorage`
- Automatically restores on page reload
- Triggers relevant API calls on load

The feed merges:
- News
- Recommendations
- Social posts (mock API)

---

## 2️⃣ API Integration

The application integrates multiple content sources:

### 📰 News API
Fetches the latest articles based on selected categories.

### 🎬 Recommendations API
Fetches movies/music recommendations based on preferences.

### 💬 Social Feed (Mock API)
Simulates hashtag-based posts to mimic real social content.

### Async Handling
- RTK Query (caching + deduplication)
- Async Thunks (where required)
- Loading states
- Error fallback UI
- Retry handling
- Empty state management

---

## 3️⃣ Interactive Content Cards

Each card contains:
- Image
- Title
- Description
- Category label
- Action button
- Favorite toggle

Enhancements:
- Hover animations
- Smooth transitions
- Skeleton loaders during fetch
- Consistent card layout

---

## 4️⃣ Dashboard Layout

### Sidebar Navigation
- Feed
- Trending
- Favorites
- Settings

### Header
- Search bar
- Dark mode toggle
- Profile section

### Responsive Design
- Mobile-first approach
- Grid layout using Tailwind CSS
- Collapsible sidebar on smaller screens

---

## 5️⃣ Search Functionality

- Global search across all content types
- Debounced input (300–500ms)
- Prevents unnecessary API calls
- Real-time filtered results

Edge cases handled:
- Empty search
- No results found
- API errors

---

## 6️⃣ Drag-and-Drop Reordering

Implemented using `dnd-kit`.

- Users can reorder feed content
- Order stored in Redux state
- Persists across page refresh
- Smooth interaction

---

## 7️⃣ Favorites System

- Users can mark items as favorites
- Stored in Redux store
- Displayed in dedicated Favorites page
- Persistent across sessions

---

## 8️⃣ Dark Mode

- Tailwind `dark` class strategy
- Redux-managed UI state
- Stored in `localStorage`
- Instant theme switching
- No hydration mismatch issues

---

# 🏗 Architecture


/app
/feed
/favorites
/trending
/recommendations

/components
/layout
/cards
/ui
/content

/store
/slices
/api

/hooks
/utils
/types



## Architectural Principles

- Feature-based folder structure
- Clear separation between UI and logic
- Centralized state management
- API abstraction layer
- Type-safe models using TypeScript
- Reusable components

The architecture is designed for scalability and maintainability.

---

# 🗂 State Management

Managed using **Redux Toolkit**.

Global state includes:
- User preferences
- Content data
- Favorites
- Drag order state
- UI state (dark mode)
- Pagination state

Why Redux Toolkit?
- Predictable state
- Clean slice pattern
- Built-in async handling
- Middleware support
- Easier debugging

---

# ⚡ Performance Optimizations

- Debounced search
- RTK Query caching
- Memoized selectors
- `React.memo` usage
- Pagination to reduce DOM size
- Optimized images with Next.js `Image`
- Avoid unnecessary re-renders

---

# 🛡 Error Handling

Each API handles:
- Loading states
- Network errors
- Timeout scenarios
- Invalid responses
- Graceful fallback UI
- Retry functionality

The UI never crashes due to API failure.

---

# 🧪 Testing Strategy

## Unit Testing
- Redux slices
- Utility functions
- Card rendering logic
- Preference logic

Tools:
- Jest
- React Testing Library

---

## Integration Testing
- Data fetch → Redux state → UI rendering
- Search functionality
- Favorites flow
- Dark mode persistence

---

## End-to-End Testing

Using Playwright:

Critical user flows tested:
- Search functionality
- Drag-and-drop reordering
- Favorite marking
- Page navigation

---

# ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Proper color contrast

---

# 🔐 Security Considerations

- API keys stored in environment variables
- No sensitive data exposed
- Sanitized search input
- Controlled API usage

---

# 🚧 Challenges Faced

- Managing multiple async APIs simultaneously
- Preventing unnecessary re-renders
- Syncing drag-and-drop state with Redux
- Avoiding hydration mismatch in Next.js
- Managing persistent UI state cleanly

Each challenge was solved through structured debugging and state normalization.

---

# 📈 Future Improvements

If expanded further:

- Authentication (NextAuth)
- Real-time feed updates via WebSockets
- Multi-language support
- AI-driven recommendation logic
- Backend integration

---

# 🛠 Installation & Setup

## 1️⃣ Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

### Install dependencies
npm install

### Configure environment variables

Create a .env.local file:

NEXT_PUBLIC_NEWS_API_KEY=your_key_here
NEXT_PUBLIC_RECOMMENDATION_API_KEY=your_key_here

## Run development server
npm run dev

Open:

http://localhost:3000

## 🏁 Build for Production
```
npm run build
npm start```

### Tech Stack
- Next.js (App Router)

- React 18

- TypeScript

- Redux Toolkit

- RTK Query

- Tailwind CSS

- dnd-kit

- Jest

- React Testing Library

- Playwright
