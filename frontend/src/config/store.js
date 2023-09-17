import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/user.reducer";
import productReducer from "../reducer/product.reducer";

const store = configureStore({
    reducer: {
        // name: value
        User: userReducer,
        cart: productReducer
    }
})

export default store