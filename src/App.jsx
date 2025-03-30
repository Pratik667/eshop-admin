import './App.css';
import './components/layout/style.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/layout/PrivateRoute"; // Custom Route for auth
import Login from "./components/layout/Login"; // Login page
import Products from "./components/layout/Products"; 
import Users from "./components/layout/Users"; 
import Logout from './components/layout/Logout';
import Dashboard from './components/layout/Dashboard';
import Register from './components/layout/Register';
import AddProduct from './components/layout/AddProduct';
function App() {
  // const apiUrl = process.env.REACT_APP_API_URL;
  // console.log(apiUrl);
  return (
    
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          {/* Protected Routes inside Dashboard */}
          <Route path="" element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="logout" element={<Logout />} />
          <Route path="product-add" element={<AddProduct />}/>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
   
  );
}

export default App;
