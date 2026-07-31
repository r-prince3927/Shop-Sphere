import { NavLink } from "react-router-dom";
import {
    ShoppingBag,
    ShoppingCart,
    ClipboardList,
    Heart,
    User,
    LogOut,
} from "lucide-react";

function Navbar() {

    const token = localStorage.getItem("access");

    function handleLogout() {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";

    }

    return (

        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}

                <NavLink

                    to="/"

                    className="flex items-center gap-3"

                >

                    <div className="rounded-xl bg-blue-600 p-3">

                        <ShoppingBag

                            size={26}

                            className="text-white"

                        />

                    </div>

                    <span className="text-4xl font-bold text-gray-900">

                        ShopSphere

                    </span>

                </NavLink>

                {/* Navigation */}

                <nav className="hidden items-center gap-10 md:flex">

                    <NavLink

                        to="/"

                        className={({ isActive }) =>

                            isActive

                                ? "font-semibold text-blue-600"

                                : "font-medium text-gray-700 hover:text-blue-600"

                        }

                    >

                        Home

                    </NavLink>

                    <NavLink

                        to="/products"

                        className={({ isActive }) =>

                            isActive

                                ? "font-semibold text-blue-600"

                                : "font-medium text-gray-700 hover:text-blue-600"

                        }

                    >

                        Products

                    </NavLink>
                    <NavLink
                        to="/wishlist"
                        className={({ isActive }) =>

                            isActive
                            ? "flex items-center gap-2 font-semibold text-blue-600"
                            
                            : "flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"

                    }
                    >
                            <Heart size={20} />
                        Wishlist
                    </NavLink>

                    <NavLink

                        to="/orders"

                        className={({ isActive }) =>

                            isActive

                                ? "font-semibold text-blue-600"

                                : "font-medium text-gray-700 hover:text-blue-600"

                        }

                    >
                        Orders
                    </NavLink>

                    <NavLink

                        to="/cart"

                        className={({ isActive }) =>

                            isActive

                                ? "flex items-center gap-2 font-semibold text-blue-600"

                                : "flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600"

                        }

                    >

                        <ShoppingCart size={20} />

                        Cart

                    </NavLink>

                </nav>

                {/* Right Side */}

                <div className="flex items-center gap-4">

                    {

                        token ?

                        (

                            <>

                                <NavLink

                                    to="/profile"

                                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"

                                >

                                    <User size={18} />

                                    Profile

                                </NavLink>

                                <button

                                    onClick={handleLogout}

                                    className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-600 transition hover:bg-red-600 hover:text-white"

                                >

                                    <LogOut size={18} />

                                    Logout

                                </button>

                            </>

                        )

                        :

                        (

                            <>

                                <NavLink

                                    to="/login"

                                    className="rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"

                                >

                                    Login

                                </NavLink>

                                <NavLink

                                    to="/register"

                                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"

                                >

                                    Register

                                </NavLink>

                            </>

                        )

                    }

                </div>

            </div>

        </header>

    );

}

export default Navbar;