import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCurrentPage } from '../Redux/Slice/productSlice';
import Categories from './Categeories';

const Products = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    // Get product data, pagination info, and loading state from Redux
    const { products, currentPage, totalProducts, productsPerPage, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        // Fetch products when the component mounts or when the current page or search term changes
        dispatch(fetchProducts({ page: currentPage, productsPerPage, searchTerm }));
    }, [dispatch, currentPage, productsPerPage, searchTerm]);

    // Handle "Next" page
    const handleNextPage = () => {
        if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    // Handle "Previous" page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term
    };

    return (
        <>
            <Categories />
            <div className="max-w-4xl mx-auto p-6">
                {/* Search input */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                        className="border p-2 w-full rounded"
                    />
                </div>

                <div className="mt-6">
                    <h4 className="text-lg font-semibold">All Products (Page {currentPage}):</h4>

                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p className="text-red-500">Error loading products: {error}</p>
                    ) : (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            {products.map((product) => (
                                <li key={product.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                                    <img src={product.images[0]} alt={product.title} className="w-full h-32 object-cover" />
                                    <h5 className="font-bold mt-2">{product.title}</h5>
                                    <p className="text-sm text-gray-600">Price: ${product.price}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {Math.ceil(totalProducts / productsPerPage)}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Products;
