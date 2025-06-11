import { createSlice } from "@reduxjs/toolkit";

const addCartAndWishlist = createSlice({
  name: "addCartAndWishlist",
  initialState: {
    cart: [],
    wishlist: [],
  },
  reducers: {
    addCart: (state, action) => {
      const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.cartQuantity += 1;
      } else {
        state.cart.push({...action.payload,cartQuantity:1});
      }
    },
    addWishlist: (state, action) => {
      const existingProduct = state.wishlist.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.wishlistQuantity += 1;
      } else {
        state.wishlist.push({...action.payload,wishlistQuantity:1});
      }
    },
    increaseCartQuantity:(state,action) => {
        const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if(existingProduct){
        existingProduct.cartQuantity+=1
      }
    },
    decreaseCartQuantity:(state,action)=>{
         const existingProduct = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct && existingProduct.cartQuantity > 1) {
        existingProduct.cartQuantity -= 1;
      }
    },
    removeAndAddInWishlist:(state,action)=>{
        state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseWishlistQuantity:(state,action)=>{
        const existingProduct = state.wishlist.find((item)=> item.id === action.payload.id)
        if(existingProduct){
          existingProduct.wishlistQuantity+=1
        }
    },
    decreaseWishlistQuantity:(state,action)=>{
        const existingProduct = state.wishlist.find((item)=> item.id === action.payload.id)
        if(existingProduct && existingProduct.wishlistQuantity>1){
            existingProduct.wishlistQuantity-=1
        }
    },
    removeFromWishlist:(state,action)=>{
        state.wishlist=state.wishlist.filter((item)=> item.id !== action.payload.id)
    }
  },
});

export const { addCart, addWishlist,increaseCartQuantity,decreaseCartQuantity,removeAndAddInWishlist,increaseWishlistQuantity,decreaseWishlistQuantity,removeFromWishlist } = addCartAndWishlist.actions;
export default addCartAndWishlist.reducer;
