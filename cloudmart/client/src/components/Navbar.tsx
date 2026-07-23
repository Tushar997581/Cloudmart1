import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-amazon text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-amazon-orange tracking-tighter">CloudMart</Link>
            
            <div className="flex-1 max-w-2xl mx-6">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                />
            </div>

            <div className="flex items-center space-x-6">
                {user ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm">Hello, {user.email}</span>
                        <button onClick={logout} className="hover:text-amazon-orange text-sm font-bold">Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="flex items-center hover:text-amazon-orange">
                        <UserIcon className="h-6 w-6 mr-1" />
                        <span className="font-bold">Sign In</span>
                    </Link>
                )}
                <Link to="/cart" className="flex items-center hover:text-amazon-orange">
                    <ShoppingCartIcon className="h-6 w-6" />
                    <span className="font-bold ml-1">Cart</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;