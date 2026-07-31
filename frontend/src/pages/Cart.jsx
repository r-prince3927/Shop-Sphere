import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import CartItem from "../components/CartItem";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { getCart } from "../services/cartService";

function Cart() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        loadCart();

    }, []);

    async function loadCart() {

        try {

            const data = await getCart();

            setCart(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load cart");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    if (!cart || cart.items.length === 0) {

        return (

            <main className="mx-auto max-w-7xl px-6 py-20">

                <EmptyState

                    title="Your Cart is Empty"

                    description="Start shopping to add products to your cart."

                />

            </main>

        );

    }

    return (

        <main className="mx-auto max-w-7xl px-6 py-14">

            <motion.div

                initial={{ opacity: 0, y: -20 }}

                animate={{ opacity: 1, y: 0 }}

                className="mb-10"

            >

                <h1 className="flex items-center gap-3 text-5xl font-bold text-gray-900">

                    <ShoppingCart size={42} />

                    Shopping Cart

                </h1>

                <p className="mt-3 text-lg text-gray-600">

                    {cart.items.length} item(s) in your cart

                </p>

            </motion.div>

            <div className="grid gap-10 lg:grid-cols-3">

                <div className="space-y-8 lg:col-span-2">

                    {

                        cart.items.map((item) => (

                            <CartItem

                                key={item.id}

                                item={item}

                                refreshCart={loadCart}

                            />

                        ))

                    }

                </div>

                <div>

                    <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <h2 className="text-2xl font-bold">

                            Order Summary

                        </h2>

                        <div className="mt-8 space-y-5">

                            <div className="flex justify-between">

                                <span>Items</span>

                                <span>{cart.items.length}</span>

                            </div>

                            <div className="flex justify-between">

                                <span>Shipping</span>

                                <span className="text-green-600">

                                    FREE

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span>Total</span>

                                <span className="font-bold">

                                    ₹ {Number(cart.grand_total).toLocaleString("en-IN")}

                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between text-3xl font-bold">

                                <span>

                                    Grand Total

                                </span>

                                <span>

                                    ₹ {Number(cart.grand_total).toLocaleString("en-IN")}

                                </span>

                            </div>

                        </div>

                        <button

                            onClick={() => navigate("/checkout")}

                            className="mt-10 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"

                        >

                            Proceed to Checkout

                        </button>

                    </div>

                </div>

            </div>

        </main>

    );

}

export default Cart;