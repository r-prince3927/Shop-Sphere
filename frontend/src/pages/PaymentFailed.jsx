import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PaymentFailed() {

    return (

        <main className="flex min-h-[80vh] items-center justify-center bg-gray-100 px-6">

            <motion.div

                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}

                animate={{
                    opacity: 1,
                    scale: 1,
                }}

                transition={{
                    duration: 0.5,
                }}

                className="w-full max-w-xl rounded-3xl bg-white p-12 text-center shadow-xl"

            >

                <XCircle

                    size={90}

                    className="mx-auto text-red-500"

                />

                <h1 className="mt-8 text-4xl font-bold text-gray-900">

                    Payment Failed

                </h1>

                <p className="mt-5 text-lg leading-8 text-gray-600">

                    Your payment could not be completed.

                    <br />

                    Please try again.

                </p>

                <div className="mt-10 space-y-4">

                    <Link

                        to="/cart"

                        className="block rounded-xl bg-red-600 py-4 text-lg font-semibold text-white transition hover:bg-red-700"

                    >

                        Retry Payment

                    </Link>

                    <Link

                        to="/products"

                        className="block rounded-xl border border-red-600 py-4 text-lg font-semibold text-red-600 transition hover:bg-red-50"

                    >

                        Continue Shopping

                    </Link>

                </div>

            </motion.div>

        </main>

    );

}

export default PaymentFailed;