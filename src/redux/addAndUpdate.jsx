import { createSlice } from "@reduxjs/toolkit";

const addAndUpdate = createSlice({
  name: "addAndUpdate",
  initialState: {
    products: [
      {
        id: 0,
        image:
          "https://m.media-amazon.com/images/I/61j3otNa6sL._AC_UF1000,1000_QL80_.jpg",
        name: "PC",
        price: 2000,
        quantity: 3,
      },
      {
        id: 1,
        image:
          "https://cdn.thewirecutter.com/wp-content/media/2024/11/cheapgaminglaptops-2048px-7981.jpg",
        name: "Laptop",
        price: 1500,
        quantity: 7,
      },
    ],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    decreaseProductQuantity: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product && product.quantity > 0) {
        product.quantity -= 1;
      }
    },
    increaseProductQuantity: (state, action) => {
      const product = state.products.find((p) => p.id === action.payload.id);

      if (product) {
        product.quantity += 1;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    editProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
      }
    },
  },
});
export const {
  addProduct,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProduct,
  editProduct
} = addAndUpdate.actions;
export default addAndUpdate.reducer;
