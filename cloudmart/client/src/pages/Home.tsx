import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        api.get('/products').then(res => setProducts(res.data)).catch(console.error);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;