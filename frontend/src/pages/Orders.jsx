import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import OrderCard from "../components/OrderCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { getOrders } from "../services/orderService";

function Orders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadOrders();

    }, []);

    async function loadOrders() {

        try {

            const data = await getOrders();

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

    if (loading) {

        return <LoadingSpinner />;

    }

    if (orders.length === 0) {

        return (

            <main className="mx-auto max-w-7xl px-6 py-20">

                <EmptyState

                    title="No Orders Yet"

                    description="Place your first order to see it here."

                />

            </main>

        );

    }

    return (

        <main className="mx-auto max-w-7xl px-6 py-14">

            {/* Header */}

            <motion.div

                initial={{ opacity: 0, y: -20 }}

                animate={{ opacity: 1, y: 0 }}

                className="mb-12"

            >

                <h1 className="flex items-center gap-3 text-5xl font-bold text-gray-900">

                    <ClipboardList size={42} />

                    My Orders

                </h1>

                <p className="mt-3 text-lg text-gray-600">

                    You have placed {orders.length} order(s).

                </p>

            </motion.div>

            {/* Orders */}

            <div className="space-y-8">

                {

                    orders.map((order) => (

                        <OrderCard

                            key={order.id}

                            order={order}

                        />

                    ))

                }

            </div>

        </main>

    );

}

export default Orders;