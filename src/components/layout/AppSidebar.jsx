import React from "react";
import { Link } from "react-router-dom"; // Link for navigation and Outlet for nested routes

const AppSidebar = ({toggleSidebar}) => {
    return (    
        <ul>
            <li><Link to="/dashboard/products" onClick={toggleSidebar}>Products</Link></li>
            <li><Link to="/dashboard/users" onClick={toggleSidebar}>Users</Link></li>
            <li><Link to="/dashboard/product-add" onClick={toggleSidebar}>Add Product</Link></li>
            <li><Link to="/dashboard/logout" onClick={toggleSidebar}>Logout</Link></li>
        </ul>
    )
}

export default AppSidebar