import { NavLink } from "react-router-dom";

function Footer() {

    return (

        <footer className="mt-24 border-t border-gray-200 bg-white">

            <div className="container grid gap-12 py-16 md:grid-cols-3">

                {/* Brand */}

                <div>

                    <h2 className="text-2xl font-bold text-gray-900">

                        ShopSphere

                    </h2>

                    <p className="mt-4 max-w-sm leading-7 text-gray-600">

                        A modern electronics marketplace built using
                        React, Django REST Framework and PostgreSQL.

                    </p>

                </div>

                {/* Quick Links */}

                <div>

                    <h3 className="mb-4 text-lg font-semibold">

                        Quick Links

                    </h3>

                    <div className="flex flex-col gap-3 text-gray-600">

                        <NavLink to="/">Home</NavLink>

                        <NavLink to="/products">Products</NavLink>

                        <NavLink to="/cart">Cart</NavLink>

                        <NavLink to="/orders">Orders</NavLink>

                    </div>

                </div>

                {/* Support */}

                <div>

                    <h3 className="mb-4 text-lg font-semibold">

                        Support

                    </h3>

                    <div className="flex flex-col gap-3 text-gray-600">

                        <a href="#">Privacy Policy</a>

                        <a href="#">Terms & Conditions</a>

                        <a href="#">Contact Us</a>

                    </div>

                </div>

            </div>

            <div className="border-t border-gray-200">

                <div className="container py-6 text-center text-sm text-gray-500">

                    © 2026 ShopSphere. All rights reserved.

                </div>

            </div>

        </footer>

    );

}

export default Footer;