import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: [],
    totalProducts: 0,
    currentPage: 1,
    productsPerPage: 10,
    loading: false,
    error: null,
};

// Async thunk for fetching products with pagination
// export const fetchProducts = createAsyncThunk(
//     'products/fetchProducts',
//     async ({ page, productsPerPage }) => {
//         if (page < 1) {
//             page = 1
//         }
//         if (productsPerPage < 10) {
//             productsPerPage = 10
//         }
//         const skip = (page - 1) * productsPerPage;
//         const response = await axios.get(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`);
//         return { products: response.data.products, total: response.data.total };
//     }
// );



export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ page, productsPerPage, searchTerm = '' }) => {
        const skip = (page - 1) * productsPerPage;
        const searchQuery = searchTerm ? `&q=${searchTerm}` : '';  // Add search term to the query if available
        const response = await axios.get(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}${searchQuery}`);
        return { products: response.data.products, total: response.data.total };
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.totalProducts = action.payload.total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage } = productsSlice.actions;
export default productsSlice.reducer;
