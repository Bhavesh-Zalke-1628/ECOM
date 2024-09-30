import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    categories: [],
    categoryProduct: [],
    filteredProducts: [], // Add filteredProducts to hold search results
    loading: false,
    error: null,
};

// Async thunk for fetching categories
export const getCategoriesData = createAsyncThunk('category/getCategoriesData', async () => {
    const response = await axios.get('https://dummyjson.com/products/categories');
    return response.data;
});

// Async thunk for fetching products by category
export const getProductsByCategory = createAsyncThunk('category/getProductsByCategory', async (category) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return response.data.products;
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        searchProducts: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.filteredProducts = state.categoryProduct.filter((product) =>
                product.title.toLowerCase().includes(searchTerm)
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesData.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoriesData.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getCategoriesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getProductsByCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categoryProduct = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(getProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { searchProducts } = categorySlice.actions;

export default categorySlice.reducer;
