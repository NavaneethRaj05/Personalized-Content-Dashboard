# Personalized Content Dashboard

A robust, full-stack frontend application built for the Software Development Engineer Intern Assignment. This dashboard seamlessly aggregates news, movie recommendations, and social media posts into a highly interactive, personalized, and beautifully animated user interface.

## 🚀 Live Demo & Video
- **Live Link:** [Add your Vercel/Netlify link here]
- **Demo Video:** [Add your Loom/YouTube link here]

---

## 🌟 Key Features Implemented (Assignment Criteria)

1. **Personalized Feed & API Integration**
   - **NewsAPI**: Fetches live top headlines based on the user's category preferences.
   - **TMDB Recommendations (Mock)**: High-quality mock service for movie recommendations.
   - **Social Media (Mock)**: Simulated Twitter/Instagram feed.
   - *All three sources are fetched concurrently via RTK Query and interleaved into a unified feed.*

2. **Advanced UI/UX Features**
   - **Drag and Drop**: Fully implemented using `@dnd-kit/core` with smooth layout animations (Framer Motion).
   - **Debounced Search**: The search bar in the header automatically searches as you type (400ms debounce), with a `Cmd+K` / `Ctrl+K` keyboard shortcut.
   - **Pagination (Infinite Feed)**: The feed features a "Load More" button to append new articles smoothly.
   - **Dark Mode**: Complete integration with Tailwind CSS and CSS variables.
   - **Hero Slider**: Automatic top-story carousel with gesture swiping.

3. **State Management (Redux Toolkit)**
   - **Global State**: Manages User Preferences (categories, theme) and Favorites.
   - **Persistence**: Built-in `redux-persist` using `localStorage` to save user state across sessions.
   - **Async Logic**: Managed via `RTK Query` for automatic caching and deduplication.

4. **Testing Suite (Jest & React Testing Library)**
   - **Unit Tests**: Full coverage for Redux slices (`preferencesSlice.test.ts`, `favoritesSlice.test.ts`).
   - **Integration Tests**: Tests for complex components like `ContentCard` and `SettingsPage`.

5. **AI Integration (Bonus Feature)**
   - **Floating AI Chatbot**: Powered by Groq (LLaMA3), users can ask questions about current events.
   - **AI Summarizer**: A button on every article card that instantly generates a 2-sentence summary using AI.

---

## 🛠️ Project Architecture

```
src/
├── app/                  # Next.js 14 App Router pages (/, /search, /settings, /favorites)
├── components/
│   ├── ai/               # Chatbot and Summarizer components
│   ├── cards/            # Unified ContentCard used across all feeds
│   ├── feed/             # Aggregation logic, HeroSlider, and Draggable Feed
│   ├── layout/           # Sidebar, Header, Mobile Bottom Nav
│   └── providers/        # Redux Provider, Theme Provider
├── hooks/                # Custom hooks (useDebounce)
├── services/             # RTK Query API definitions (newsApi, tmdbApi, socialApi)
├── store/                # Redux Toolkit configuration & slices
└── __tests__/            # Jest test suites
```

---

## 💻 Local Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd Assignment
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root of the project with the following keys:
   ```env
   # Required for live news fetching
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
   
   # Required for AI Features (Groq LLaMA3)
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing

The project uses Jest and React Testing Library.

To run the test suite:
```bash
npm run test
```

To run tests with coverage:
```bash
npm run test:coverage
```

---
*Developed for SDE Intern Assignment.*
