import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItems: [],
  categoryItems: [],
  filterItems: [],
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
      if (selectCategory) {
        state.filterItems = state.productItems.filter(
          (product) => product.category === selectCategory
        );
      } else if (selectCategory == "00") {
        state.filterItems = state.productItems;
      }
    },
    addCategoryList: (state, action) => {
      const listCategory = action.payload;
      state.categoryItems = listCategory;
    },

    sortingList: (state, action) => {
      const selectSort = action.payload;
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
      } else if (selectSort == "descending") {
        state.filterItems.length > 0
          ? state.filterItems.sort((a, b) => {
              return b.title.localeCompare(a.title);
            })
          : state.productItems.sort((a, b) => {
              return b.title.localeCompare(a.title);
            });
      }
    },
    resetList: (state, action) => {
      const items = action.payload;
      console.log(items);
      state.filterItems = [];
      state.productItems = items;
    },
    searchingItems: (state, action) => {
      const searchItems = action.payload.toLowerCase();
      console.log(searchItems);
      state.productItems = state.productItems
        ? state.productItems.filter((product) =>
            product.title.toLowerCase().includes(searchItems)
          )
        : state.filterItems.filter((product) =>
            product.title.toLowerCase().includes(searchItems)
          );
      state.filterItems = state.filterItems
        ? state.productItems.filter((product) =>
            product.title.toLowerCase().includes(searchItems)
          )
        : state.filterItems.filter((product) =>
            product.title.toLowerCase().includes(searchItems)
          );
    },
  },
});

export const {
  addItemToList,
  filteringItems,
  sortingList,
  addCategoryList,
  resetList,
  searchingItems,
} = productSlice.actions;

export default productSlice;

export const ProductItems = (state) => state.product.productItems;
export const FilterItems = (state) => state.product.filterItems;
export const CategoryItems = (state) => state.product.categoryItems;
