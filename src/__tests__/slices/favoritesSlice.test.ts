import favoritesReducer, {
  toggleFavorite,
  ContentItem,
} from '../../../src/store/slices/favoritesSlice';

const mockItem: ContentItem = {
  id: 'article-1',
  type: 'news',
  title: 'Test Article Title',
  description: 'This is a test article description.',
  imageUrl: 'https://example.com/image.jpg',
  url: 'https://example.com/article-1',
  date: '2024-01-01T00:00:00Z',
  source: 'Test Source',
};

const mockItem2: ContentItem = {
  id: 'article-2',
  type: 'movie',
  title: 'Test Movie',
  description: 'A great movie.',
  imageUrl: undefined,
  url: 'https://example.com/movie-2',
  date: '2024-01-02T00:00:00Z',
  source: 'TMDB',
};

describe('favoritesSlice', () => {
  const initialState = { items: [] };

  it('should return the initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('toggleFavorite', () => {
    it('should add an item when it does not exist in favorites', () => {
      const state = favoritesReducer(initialState, toggleFavorite(mockItem));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(mockItem);
    });

    it('should remove an item when it already exists in favorites', () => {
      const stateWithItem = { items: [mockItem] };
      const state = favoritesReducer(stateWithItem, toggleFavorite(mockItem));
      expect(state.items).toHaveLength(0);
    });

    it('should not remove other items when removing a specific item', () => {
      const stateWithItems = { items: [mockItem, mockItem2] };
      const state = favoritesReducer(stateWithItems, toggleFavorite(mockItem));
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual(mockItem2);
    });

    it('should handle multiple items being added', () => {
      let state = favoritesReducer(initialState, toggleFavorite(mockItem));
      state = favoritesReducer(state, toggleFavorite(mockItem2));
      expect(state.items).toHaveLength(2);
    });

    it('should match item by id for removal', () => {
      const stateWithItem = { items: [mockItem] };
      // An item with same id but different data should still be removed
      const sameIdDifferentData = { ...mockItem, title: 'Updated Title' };
      const state = favoritesReducer(stateWithItem, toggleFavorite(sameIdDifferentData));
      expect(state.items).toHaveLength(0);
    });
  });
});
