import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./Slice/categoriesSlice";
import productSlice from "./Slice/productSlice";
const store = configureStore({
    reducer: {
        category: categorySlice,
        products: productSlice
    },
    devTools: true
})


export default store;