import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../../components/LoadingSpinner";
import AdminStatCard from "../../components/AdminStatCard";

import { getDashboardData } from "../../services/adminDashboardService";

import {
    Package,
    Users,
    ShoppingBag,
    IndianRupee,
} from "lucide-react";

function AdminDashboard() {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        products: 0,
        users: 0,
        orders: 0,
        revenue: 0,
        latest_orders: [],
        latest_users: [],
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {
            const data = await getDashboardData();
            setStats({
            products: data.total_products,
            users: data.total_users,
            orders: data.total_orders,
            revenue: data.total_revenue,
            latest_orders: data.latest_orders,
            latest_users: data.latest_users,
            });
        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load dashboard");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div>
            <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <AdminStatCard
                    title="Products"
                    value={stats.products}
                    icon={<Package size={30} />}
                    color="bg-blue-600"
                />

                <AdminStatCard
                    title="Users"
                    value={stats.users}
                    icon={<Users size={30} />}
                    color="bg-green-600"
                />

                <AdminStatCard
                    title="Orders"
                    value={stats.orders}
                    icon={<ShoppingBag size={30} />}
                    color="bg-purple-600"
                />

                <AdminStatCard
                    title="Revenue"
                    value={`₹${Number(stats.revenue).toLocaleString("en-IN")}`}
                    icon={<IndianRupee size={30} />}
                    color="bg-orange-600"
                />

            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                <div className="rounded-2xl bg-white p-6 shadow">

                    <h2 className="mb-5 text-2xl font-bold">

                        Latest Orders

                    </h2>

                    <table className="min-w-full text-sm">

                        <thead>

                            <tr className="border-b">

                                <th className="px-4 py-3 text-left">

                                    ID

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Customer

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Amount

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Status

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {stats.latest_orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="border-b"
                                >

                                    <td className="px-4 py-3">

                                        #{order.id}

                                    </td>

                                    <td className="px-4 py-3">

                                        {order.customer}

                                    </td>

                                    <td className="px-4 py-3">

                                        ₹{Number(order.amount).toLocaleString("en-IN")}

                                    </td>

                                    <td className="px-4 py-3">

                                        {order.status}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                <div className="rounded-2xl bg-white p-6 shadow">

                    <h2 className="mb-5 text-2xl font-bold">

                        Recent Users

                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="px-4 py-3 text-left">

                                    ID

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Email

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {stats.latest_users.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-b"
                                >

                                    <td className="px-4 py-3">

                                        {user.id}

                                    </td>

                                    <td className="px-4 py-3">

                                        {user.email}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;