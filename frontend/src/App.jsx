import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import NotFound from "./pages/NotFound";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

import { getProducts } from "./services/productService";

function CustomerLayout({ products }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />

            <main className="flex-1">
                <Routes>
                    <Route
                        path="/"
                        element={<Home products={products} />}
                    />

                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="/wishlist"
                        element={
                            <ProtectedRoute>
                                <Wishlist />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <Cart />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/addresses"
                        element={
                            <ProtectedRoute>
                                <Addresses />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/payment-success"
                        element={<PaymentSuccess />}
                    />

                    <Route
                        path="/payment-failed"
                        element={<PaymentFailed />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/home"
                        element={<Navigate to="/" replace />}
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            const data = await getProducts();
            console.log("Products API Response:", data);
            

            if (Array.isArray(data)) {
                setProducts(data);
            } else if (data?.results) {
                setProducts(data.results);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Failed to load products:", error);
            setProducts([]);
        }
    }

    return (
        <Routes>
            {/* Customer Website */}
            <Route
                path="/*"
                element={<CustomerLayout products={products} />}
            />

            {/* Admin Panel */}
            <Route
                path="/admin"
                element={<AdminLayout />}
            >
                <Route
                    index
                    element={<AdminDashboard />}
                />

                <Route
                    path="products"
                    element={<AdminProducts />}
                />

                <Route
                    path="products/add"
                    element={<AddProduct />}
                />

                <Route
                    path="products/edit/:id"
                    element={<EditProduct />}
                />

                <Route
                    path="orders"
                    element={<AdminOrders />}
                />

                <Route
                    path="users"
                    element={<AdminUsers />}
                />
            </Route>
        </Routes>
    );
}

export default App;