import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartService from "../pages/product/cart.service";

export const setCartAPI = createAsyncThunk(
    "Product/setCartAPI",
    async(data, thunkAPI) => {
        try {
            let response = await cartService.sendToCart(data);
            return response;
        } catch(exception) {
            throw exception
        }
    }
);

const ProductReducer = createSlice({
    name: "Product",
    initialState: {
        cart: []
    },
    reducers: {
        setItemInTheCart: (state, action) => {
            let cart = JSON.parse(localStorage.getItem('cart')) ?? [];
            state.cart = cart;
        },
        resetCart: (state, action) => {
            localStorage.removeItem("cart")
            state.cart = null;
            return;
        },
        setCart: (state, action) => {
            // action => {type:"Product/setCart", payload: {} | null | undefined}
            let cart = JSON.parse(localStorage.getItem('cart')) ?? [];
            
            if(cart && cart.length){
                // Non empty in LS
                // product => exists 
                // does not exists
                let index = null
               
                cart.map((cartItem, key) => {
                    if(cartItem.productId === action.payload.productId) {
                        index = key;
                    }
                })

                if(index === null) {
                    // non exists 
                    cart.push(action.payload)
                } else {
                    // existing 
                    // current item=> qty
                    // cart[index].qty = action.payload.qty;

                    if(action.payload.qty <= 0){
                        cart.splice(index, 1);
                    } else {
                        cart[index].qty = action.payload.qty;
                    }
                }
            } else {
                cart.push(action.payload)
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            state.cart = cart
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setCartAPI.fulfilled, (state, action) => {
            console.log("success", action.payload);
        })
        builder.addCase(setCartAPI.rejected, (state, action) => {
            console.log('reject', action.payload)
        })
    }
})

export const {setCart, setItemInTheCart, resetCart} = ProductReducer.actions

export default ProductReducer.reducer;