import { Link, useLocation } from "react-router-dom";

import {

    CheckCircleIcon,

} from "@heroicons/react/24/solid";

function PaymentSuccess() {

    const location = useLocation();

    const order = location.state?.order;

    return (

        <main className="flex min-h-screen items-center justify-center bg-green-50">

            <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">

                <CheckCircleIcon

                    className="mx-auto h-24 w-24 text-green-500"

                />

                <h1 className="mt-6 text-4xl font-bold text-green-700">

                    Payment Successful

                </h1>

                <p className="mt-4 text-gray-600">

                    Thank you for shopping with ShopSphere.

                </p>

                {

                    order && (

                        <div className="mt-8 rounded-xl bg-gray-100 p-6 text-left">

                            <p>

                                <strong>Order ID:</strong>

                                {" "}

                                #{order.id}

                            </p>

                            <p>

                                <strong>Total:</strong>

                                {" "}

                                ₹{order.total_amount}

                            </p>

                            <p>

                                <strong>Status:</strong>

                                {" "}

                                {order.status}

                            </p>

                        </div>

                    )

                }

                <Link

                    to="/orders"

                    className="mt-8 inline-block rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"

                >

                    View My Orders

                </Link>

            </div>

        </main>

    );

}

export default PaymentSuccess;