import React from 'react';

const ShowProducts = ({ data }) => {
    console.log(data)
    return (
        <div className="p-4 border rounded shadow">
            <img src={data.images[0]} alt={data.name} className="w-full h-48 object-cover border-2 hover:cursor-pointer hover:bg-pink-200  transition-all duration-300 mb-2" />
            <h3 className="text-lg font-semibold">{data.title}</h3>
            <p>{data.description}</p>
            <p className="font-bold">${data.price}</p>
        </div>
    );
};
export default ShowProducts;
