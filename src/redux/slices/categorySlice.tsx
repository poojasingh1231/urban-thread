import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  items: string[];
}

const initialState: CategoryState = {
  items: [],
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
