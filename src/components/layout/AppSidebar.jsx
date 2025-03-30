import React from "react";
import { Link } from "react-router-dom"; // Link for navigation and Outlet for nested routes

const AppSidebar = () => {
    return (    
        <ul>
            <li><Link to="/dashboard/products">Products</Link></li>
            <li><Link to="/dashboard/users">Users</Link></li>
            <li><Link to="/dashboard/product-add">Add Product</Link></li>
            <li><Link to="/dashboard/logout">Logout</Link></li>
        </ul>
    )
}

export default AppSidebar