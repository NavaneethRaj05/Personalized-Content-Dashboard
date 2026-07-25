# Personalized Content Dashboard

A robust, full-stack frontend application built for the Software Development Engineer Intern Assignment. 

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **State Management**: Redux Toolkit + RTK Query
- **Persistence**: Redux Persist (localStorage)
- **Drag & Drop**: `@dnd-kit/core`
- **Animations**: Framer Motion
- **Icons**: React Icons (Feather Icons)
- **APIs Integrated**: NewsAPI (Live Data)

## 🌟 Key Features

1. **Personalized Feed**: Integrates live data from NewsAPI based on the user's category preferences.
2. **User Preferences**: Select from multiple categories (Technology, Sports, Business, etc.). Preferences are persisted across sessions.
3. **Interactive UI**:
   - **Drag and Drop**: Reorder your feed using `@dnd-kit`'s smooth physics-based drag-and-drop.
   - **Dark Mode**: Fully implemented dark mode using `next-themes` and Tailwind CSS.
4. **Search Functionality**: A robust search interface using query parameters to fetch dynamic results.
5. **Favorites System**: Save any article to your favorites for later reading. Persisted locally.
6. **State Management**: Complex state handled natively with Redux Toolkit and caching via RTK Query.

## 🛠️ Local Setup

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
   Create a `.env.local` file in the root of the project:
   ```env
   NEXT_PUBLIC_NEWS_API_KEY=a433215b510446e78cdf40be41808994
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## 🧪 Testing

Testing infrastructure can be added using standard Next.js Jest and Playwright configurations.

## 🏗️ Architecture Decisions

- **Next.js App Router**: Utilized for modern React Server Components and improved performance.
- **Redux Persist**: Selected over raw `localStorage` to seamlessly integrate with Redux Toolkit, ensuring state is rehydrated robustly.
- **Tailwind CSS**: Ensures rapid styling, scoped CSS, and a perfectly integrated Dark Mode using the `class` strategy.
- **RTK Query**: Prevents redundant network requests by caching API responses effectively and providing elegant loading/error states.

---
*Developed for SDE Intern Assignment.*
