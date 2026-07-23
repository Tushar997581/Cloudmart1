import React from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button className="bg-amazon-orange text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;