



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesData, getProductsByCategory, searchProducts } from '../Redux/Slice/categoriesSlice';

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);  // State for selected category
    const [searchTerm, setSearchTerm] = useState('');  // State for search term

    const dispatch = useDispatch();

    // Get categories, products, and filtered products from the Redux store
    const categories = useSelector((state) => state.category.categories);
    const filteredProducts = useSelector((state) => state.category.filteredProducts);

    // Fetch categories when the component mounts
    useEffect(() => {
        dispatch(getCategoriesData());
    }, [dispatch]);

    // Handle category selection
    const handleCategoryClick = (categorySlug) => {
        setSelectedCategory(categorySlug);  // Set selected category
        dispatch(getProductsByCategory(categorySlug));  // Fetch products by category
    };

    // Handle search input change


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h3 className="text-lg font-bold mb-4">Categories</h3>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
                {categories ? (
                    categories.map((category, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 border rounded-lg hover:bg-blue-600 hover:text-white transition ${selectedCategory === category.slug ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
                            onClick={() => handleCategoryClick(category.slug)}
                        >
                            {category.name}
                        </button>
                    ))
                ) : (
                    <h1>Failed to load the data</h1>
                )}
            </div>


            {/* Display filtered products */}
            {selectedCategory && filteredProducts && (
                <div className="mt-6">
                    <h4 className="text-lg font-semibold">Products in {selectedCategory}:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition">
                                <img src={product.images[0]} alt={product.title} className="w-full h-32 object-cover" />
                                <h5 className="font-bold mt-2">{product.title}</h5>
                                <p className="text-sm text-gray-600">Price: ${product.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Categories;
