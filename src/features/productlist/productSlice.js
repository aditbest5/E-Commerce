import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItems: [],
  filterItems: [],
  searchItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addItemToList: (state, action) => {
      const listItem = action.payload;
      state.productItems = listItem;
    },
    filteringItems: (state, action) => {
      const selectCategory = action.payload;
      console.log(selectCategory);
      if (selectCategory) {
        state.filterItems = state.productItems.filter(
          (product) => product.category === selectCategory
        );
      } else {
        state.filterItems = state.productItems;
      }
    },
    sortingList: (state, action) => {
      const selectSort = action.payload;
      console.log(selectSort);
      if (selectSort == "lowest") {
        state.filterItems.length > 0
          ? state.filterItems.sort((a, b) => {
              return a.price - b.price;
            })
          : state.productItems.sort((a, b) => {
              return a.price - b.price;
            });
      } else if (selectSort == "highest") {
        state.filterItems.length > 0
          ? state.filterItems.sort((a, b) => {
              return b.price - a.price;
            })
          : state.productItems.sort((a, b) => {
              return b.price - a.price;
            });
      } else if (selectSort == "ascending") {
        state.filterItems.length > 0
          ? state.filterItems.sort((a, b) => {
              return a.title.localeCompare(b.title);
            })
          : state.productItems.sort((a, b) => {
              return a.title.localeCompare(b.title);
            });
      } else {
        state.filterItems.length > 0
          ? state.filterItems.sort((a, b) => {
              return b.title.localeCompare(a.title);
            })
          : state.productItems.sort((a, b) => {
              return b.title.localeCompare(a.title);
            });
      }
    },
  },
});

export const { addItemToList, filteringItems, sortingList } =
  productSlice.actions;

export default productSlice;

export const ProductItems = (state) => state.product.productItems;
export const FilterItems = (state) => state.product.filterItems;
