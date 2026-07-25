import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../../../src/store/slices/favoritesSlice';
import preferencesReducer from '../../../src/store/slices/preferencesSlice';
import { ContentCard } from '../../../src/components/cards/ContentCard';
import { ContentItem } from '../../../src/store/slices/favoritesSlice';

// Mock next-themes (not available in jsdom)
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}));

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.HTMLProps<HTMLButtonElement>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock @dnd-kit/sortable
jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

// Mock @dnd-kit/utilities
jest.mock('@dnd-kit/utilities', () => ({
  CSS: { Transform: { toString: jest.fn(() => '') } },
}));

const mockItem: ContentItem = {
  id: 'test-article-1',
  type: 'news',
  title: 'Breaking: Major Tech Discovery Announced',
  description: 'Scientists have discovered a new breakthrough in quantum computing.',
  imageUrl: 'https://example.com/image.jpg',
  url: 'https://example.com/article',
  date: '2024-01-15T10:00:00Z',
  source: 'Tech News Daily',
};

function renderWithStore(ui: React.ReactElement, initialFavorites: ContentItem[] = []) {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
      preferences: preferencesReducer,
    },
    preloadedState: {
      favorites: { items: initialFavorites },
    },
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('ContentCard', () => {
  it('renders the article title', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    expect(screen.getByText('Breaking: Major Tech Discovery Announced')).toBeInTheDocument();
  });

  it('renders the article description', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    expect(screen.getByText(/Scientists have discovered/)).toBeInTheDocument();
  });

  it('renders the source name', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    expect(screen.getByText('Tech News Daily')).toBeInTheDocument();
  });

  it('renders the content type badge', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    expect(screen.getByText('news')).toBeInTheDocument();
  });

  it('renders the external link button', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    const link = screen.getByTitle('Read full article');
    expect(link).toHaveAttribute('href', mockItem.url);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('shows bookmark button in unfavorited state initially', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    // The bookmark button exists but is not in favorite state
    const bookmarkBtn = screen.getByRole('button', { name: /bookmark/i });
    expect(bookmarkBtn).toBeInTheDocument();
  });

  it('dispatches toggleFavorite action when bookmark button is clicked', () => {
    const { store } = renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    
    // Initially no favorites
    expect(store.getState().favorites.items).toHaveLength(0);

    const bookmarkBtn = screen.getByRole('button', { name: /bookmark/i });
    fireEvent.click(bookmarkBtn);

    // After clicking, item should be in favorites
    expect(store.getState().favorites.items).toHaveLength(1);
    expect(store.getState().favorites.items[0].id).toBe(mockItem.id);
  });

  it('renders AI Summary button', () => {
    renderWithStore(<ContentCard id={mockItem.id} item={mockItem} />);
    expect(screen.getByText(/AI Summary/i)).toBeInTheDocument();
  });
});

describe('ContentCard — empty states', () => {
  it('renders without an image gracefully', () => {
    const itemNoImage = { ...mockItem, imageUrl: undefined };
    renderWithStore(<ContentCard id={itemNoImage.id} item={itemNoImage} />);
    expect(screen.getByText('Breaking: Major Tech Discovery Announced')).toBeInTheDocument();
  });

  it('renders without a description gracefully', () => {
    const itemNoDesc = { ...mockItem, description: '' };
    renderWithStore(<ContentCard id={itemNoDesc.id} item={itemNoDesc} />);
    expect(screen.getByText('Breaking: Major Tech Discovery Announced')).toBeInTheDocument();
  });
});
