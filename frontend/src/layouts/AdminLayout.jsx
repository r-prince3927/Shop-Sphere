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

    const menuItems = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            link: "/admin",
        },
        {
            title: "Products",
            icon: Package,
            link: "/admin/products",
        },
        {
            title: "Orders",
            icon: ShoppingCart,
            link: "/admin/orders",
        },
        {
            title: "Users",
            icon: Users,
            link: "/admin/users",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar */}

            <aside className="w-72 bg-slate-900 text-white flex flex-col">

                {/* Logo */}

                <div className="border-b border-slate-800 p-6">

                    <div className="flex items-center gap-3">

                        <ShoppingBag
                            size={34}
                            className="text-blue-500"
                        />

                        <div>

                            <h1 className="text-2xl font-bold">
                                ShopSphere
                            </h1>

                            <p className="text-sm text-slate-400">
                                Admin Dashboard
                            </p>

                        </div>

                    </div>

                </div>

                {/* Navigation */}

                <nav className="flex-1 p-4 space-y-2">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.title}
                                to={item.link}
                                end={item.link === "/admin"}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >

                                <Icon size={20} />

                                {item.title}

                            </NavLink>

                        );

                    })}

                </nav>

                {/* Logout */}

                <div className="p-4 border-t border-slate-800">

                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold transition hover:bg-red-700"
                    >

                        <LogOut size={18} />

                        Logout

                    </button>

                </div>

            </aside>

            {/* Main */}

            <div className="flex flex-1 flex-col">

                {/* Header */}

                <header className="flex items-center justify-between border-b bg-white px-10 py-6 shadow-sm">

                    <div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            ShopSphere Admin
                        </h1>

                        <p className="text-slate-500 mt-1">
                            Manage products, users and customer orders
                        </p>

                    </div>

                </header>

                {/* Content */}

                <main className="flex-1 p-8 overflow-y-auto">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default AdminLayout;