import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import LoadingSpinner from "../../components/LoadingSpinner";

import {
    getAdminOrders,
    updateOrderStatus,
} from "../../services/adminOrderService";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadOrders();

    }, []);

    async function loadOrders() {

        try {

            const data = await getAdminOrders();

            setOrders(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load orders");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleStatusChange(id, status) {

        try {

            await updateOrderStatus(id, status);

            toast.success("Order updated successfully");

            loadOrders();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update order");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div>

            <h1 className="mb-8 text-4xl font-bold">

                Orders

            </h1>

            <div className="overflow-hidden rounded-2xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="px-5 py-4 text-left">ID</th>

                            <th className="px-5 py-4 text-left">Customer</th>

                            <th className="px-5 py-4 text-left">Amount</th>

                            <th className="px-5 py-4 text-left">Status</th>

                            <th className="px-5 py-4 text-left">Date</th>

                            <th className="px-5 py-4 text-left">Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr
                                key={order.id}
                                className="border-t"
                            >

                                <td className="px-5 py-4">

                                    #{order.id}

                                </td>

                                <td className="px-5 py-4">

                                    {order.customer}

                                </td>

                                <td className="px-5 py-4">

                                    ₹{Number(order.amount).toLocaleString("en-IN")}

                                </td>

                                <td className="px-5 py-4">

                                    <select
                                        className="rounded border px-2 py-1"
                                        value={order.status}
                                        onChange={(e) => {

                                            const updatedOrders = orders.map((o) =>
                                                o.id === order.id
                                                    ? {
                                                          ...o,
                                                          status: e.target.value,
                                                      }
                                                    : o
                                            );

                                            setOrders(updatedOrders);

                                        }}
                                    >

                                        <option value="PENDING">
                                            PENDING
                                        </option>

                                        <option value="PAID">
                                            PAID
                                        </option>

                                        <option value="SHIPPED">
                                            SHIPPED
                                        </option>

                                        <option value="DELIVERED">
                                            DELIVERED
                                        </option>

                                        <option value="CANCELLED">
                                            CANCELLED
                                        </option>

                                    </select>

                                </td>

                                <td className="px-5 py-4">

                                    {new Date(order.created_at).toLocaleDateString()}

                                </td>

                                <td className="px-5 py-4">

                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                order.id,
                                                order.status
                                            )
                                        }
                                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Update
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminOrders;