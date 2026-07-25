import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreferencesState {
  categories: string[];
  theme: 'light' | 'dark';
}

const initialState: PreferencesState = {
  categories: ['technology', 'sports', 'entertainment'],
  theme: 'light',
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((c) => c !== category);
      } else {
        state.categories.push(category);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const { setCategories, toggleCategory, setTheme } = preferencesSlice.actions;

export default preferencesSlice.reducer;
