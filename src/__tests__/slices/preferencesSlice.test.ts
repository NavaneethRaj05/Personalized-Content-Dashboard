import preferencesReducer, {
  toggleCategory,
  setCategories,
  setTheme,
  PreferencesState,
} from '../../../src/store/slices/preferencesSlice';

describe('preferencesSlice', () => {
  const initialState: PreferencesState = {
    categories: ['technology', 'sports', 'entertainment'],
    theme: 'light',
  };

  it('should return the initial state', () => {
    expect(preferencesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('toggleCategory', () => {
    it('should add a category when it does not exist', () => {
      const state = preferencesReducer(initialState, toggleCategory('health'));
      expect(state.categories).toContain('health');
      expect(state.categories).toHaveLength(4);
    });

    it('should remove a category when it already exists', () => {
      const state = preferencesReducer(initialState, toggleCategory('sports'));
      expect(state.categories).not.toContain('sports');
      expect(state.categories).toHaveLength(2);
    });

    it('should not change other categories when toggling one', () => {
      const state = preferencesReducer(initialState, toggleCategory('sports'));
      expect(state.categories).toContain('technology');
      expect(state.categories).toContain('entertainment');
    });
  });

  describe('setCategories', () => {
    it('should replace all categories with the provided array', () => {
      const newCategories = ['business', 'science'];
      const state = preferencesReducer(initialState, setCategories(newCategories));
      expect(state.categories).toEqual(newCategories);
    });

    it('should support setting an empty categories array', () => {
      const state = preferencesReducer(initialState, setCategories([]));
      expect(state.categories).toEqual([]);
    });
  });

  describe('setTheme', () => {
    it('should set theme to dark', () => {
      const state = preferencesReducer(initialState, setTheme('dark'));
      expect(state.theme).toBe('dark');
    });

    it('should set theme to light', () => {
      const darkState = { ...initialState, theme: 'dark' as const };
      const state = preferencesReducer(darkState, setTheme('light'));
      expect(state.theme).toBe('light');
    });
  });
});
