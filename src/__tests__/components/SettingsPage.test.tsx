import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import preferencesReducer from '../../../src/store/slices/preferencesSlice';
import favoritesReducer from '../../../src/store/slices/favoritesSlice';
import SettingsPage from '../../../src/app/settings/page';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: jest.fn() }),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLProps<HTMLDivElement>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.HTMLProps<HTMLButtonElement>) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function renderWithStore(ui: React.ReactElement, initialCategories: string[] = []) {
  const store = configureStore({
    reducer: {
      preferences: preferencesReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      preferences: { categories: initialCategories, theme: 'light' as const },
    },
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('SettingsPage', () => {
  it('renders the page title', () => {
    renderWithStore(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders all category buttons', () => {
    renderWithStore(<SettingsPage />);
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Business')).toBeInTheDocument();
    expect(screen.getByText('Sports')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Science')).toBeInTheDocument();
    expect(screen.getByText('Entertainment')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('dispatches toggleCategory when a category button is clicked', () => {
    const { store } = renderWithStore(<SettingsPage />, []);
    
    const techButton = screen.getByText('Technology').closest('button');
    expect(techButton).not.toBeNull();
    fireEvent.click(techButton!);
    
    expect(store.getState().preferences.categories).toContain('technology');
  });

  it('shows a selected category as active (check mark visible)', () => {
    renderWithStore(<SettingsPage />, ['technology']);
    // When technology is selected, the checkmark should be visible
    // (The FiCheck icon appears inside the button when selected)
    const techButton = screen.getByText('Technology').closest('button');
    expect(techButton).toHaveClass('border-indigo-500');
  });

  it('removes a category when clicked while already selected', () => {
    const { store } = renderWithStore(<SettingsPage />, ['technology']);
    
    const techButton = screen.getByText('Technology').closest('button');
    fireEvent.click(techButton!);
    
    expect(store.getState().preferences.categories).not.toContain('technology');
  });

  it('shows correct count label when categories are selected', () => {
    renderWithStore(<SettingsPage />, ['technology', 'sports']);
    expect(screen.getByText(/2 categories selected/)).toBeInTheDocument();
  });

  it('shows correct message when no categories are selected', () => {
    renderWithStore(<SettingsPage />, []);
    expect(screen.getByText(/Select at least one category/)).toBeInTheDocument();
  });
});
