import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [
      {
          id: 'shgosgh',
          title: 'Chaos Blade+5',
          price: 600,
          description: 'Made from the soul of Witch Quelaag'
      },
      {
          id: 'hgogh',
          title: 'Iato+15',
          price: 500,
          description: 'Fully upgraded Blighttown katana'
      },
    ]
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    }
});

export const productsReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;