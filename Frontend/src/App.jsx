import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ProductProvider } from './context/ProductContext';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import AddEditProduct from './pages/AddEditProduct';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Success from './pages/Success';


import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="app-wrapper flex flex-col min-h-screen">
              <Navbar />
              <main className="main-content flex-grow">
                <Routes>
                  <Route path="/" element={<ProductList />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/success" element={<Success />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="product/add" element={<AddEditProduct />} />
                    <Route path="product/edit/:id" element={<AddEditProduct />} />
                  </Route>

                  <Route path="/add" element={<AddEditProduct />} />
                  <Route path="/edit/:id" element={<AddEditProduct />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}




export default App;