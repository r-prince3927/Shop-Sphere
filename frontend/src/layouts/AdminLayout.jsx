import { Outlet, NavLink, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    LogOut,
    ShoppingBag,
} from "lucide-react";

function AdminLayout() {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");

    }

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

            <aside className="w-72 bg-gray-900 text-white shadow-xl">

                <div className="flex items-center gap-3 border-b border-gray-800 p-6">

                    <ShoppingBag

                        size={34}

                        className="text-blue-500"

                    />

                    <div>

                        <h1 className="text-2xl font-bold">

                            ShopSphere

                        </h1>

                        <p className="text-sm text-gray-400">

                            Admin Panel

                        </p>

                    </div>

                </div>

                <nav className="mt-8 flex flex-col gap-2 px-4">

                    <NavLink

                        to="/admin"

                        end

                        className={({ isActive }) =>

                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${

                                isActive

                                    ? "bg-blue-600"

                                    : "hover:bg-gray-800"

                            }`

                        }

                    >

                        <LayoutDashboard size={20} />

                        Dashboard

                    </NavLink>

                    <NavLink

                        to="/admin/products"

                        className={({ isActive }) =>

                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${

                                isActive

                                    ? "bg-blue-600"

                                    : "hover:bg-gray-800"

                            }`

                        }

                    >

                        <Package size={20} />

                        Products

                    </NavLink>

                    <NavLink

                        to="/admin/orders"

                        className={({ isActive }) =>

                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${

                                isActive

                                    ? "bg-blue-600"

                                    : "hover:bg-gray-800"

                            }`

                        }

                    >

                        <ShoppingCart size={20} />

                        Orders

                    </NavLink>

                    <NavLink

                        to="/admin/users"

                        className={({ isActive }) =>

                            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${

                                isActive

                                    ? "bg-blue-600"

                                    : "hover:bg-gray-800"

                            }`

                        }

                    >

                        <Users size={20} />

                        Users

                    </NavLink>

                </nav>

                <div className="absolute bottom-8 left-4 right-4">

                    <button

                        onClick={handleLogout}

                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700"

                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            </aside>

            {/* Main Content */}

            <div className="flex-1">

                <header className="border-b bg-white px-8 py-6 shadow-sm">

                    <h1 className="text-3xl font-bold text-gray-900">

                        Admin Dashboard

                    </h1>

                </header>

                <main className="p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;