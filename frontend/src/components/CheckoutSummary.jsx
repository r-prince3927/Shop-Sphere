import { useNavigate } from "react-router-dom";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import {createPayment,verifyPayment,    } from "../services/paymentService";

function CheckoutSummary({

    summary,

    loading,

    addressId,

}) {

    const navigate = useNavigate();

    async function handlePayment() {

    if (!addressId) {

        alert("Please select a delivery address.");

        return;

    }

    try {

        const response = await createPayment(addressId);

        const options = {

            key: response.key,

            amount: response.amount,

            currency: response.currency,

            order_id: response.razorpay_order_id,

            name: "ShopSphere",

            description: "Order Payment",

            theme: {

                color: "#2563eb",

            },

            handler: async function (paymentResponse) {

                try {

                    const verifyResponse = await verifyPayment({

                        address_id: addressId,

                        razorpay_order_id:
                            paymentResponse.razorpay_order_id,

                        razorpay_payment_id:
                            paymentResponse.razorpay_payment_id,

                        razorpay_signature:
                            paymentResponse.razorpay_signature,

                    });

                    if (verifyResponse.success) {

                        navigate(

                            "/payment-success",

                            {

                                state: {

                                    order: verifyResponse.order,

                                },

                            }

                        );

                    }

                    else {

                        navigate("/payment-failed");

                    }

                }

                catch (error) {

                    console.error(error);

                    navigate("/payment-failed");

                }

            },

            modal: {

                ondismiss: function () {

                    navigate("/payment-failed");

                },

            },

        };

        const razorpay = new window.Razorpay(options);

        razorpay.open();

    }

    catch (error) {

        console.error(error);

        alert("Unable to start payment.");

    }

}

    /*
    =====================================
    Loading
    =====================================
    */

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-6 shadow">

                <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />

                <div className="mt-8 space-y-4">

                    {[1,2,3,4].map(item=>(

                        <div
                            key={item}
                            className="flex justify-between"
                        >

                            <div className="h-4 w-32 animate-pulse rounded bg-gray-200"/>

                            <div className="h-4 w-16 animate-pulse rounded bg-gray-200"/>

                        </div>

                    ))}

                </div>

            </div>

        );

    }

    /*
    =====================================
    Empty
    =====================================
    */

    if (!summary) {

        return (

            <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="text-xl font-bold">

                    Order Summary

                </h2>

                <p className="mt-5 text-gray-500">

                    Select an address to continue.

                </p>

            </div>

        );

    }

    /*
    =====================================
    Main UI
    =====================================
    */

    return (

        <div className="sticky top-24 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">

                Order Summary

            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span>

                        Items

                    </span>

                    <span>

                        {summary.total_items}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Subtotal

                    </span>

                    <span>

                        ₹{summary.subtotal}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Tax

                    </span>

                    <span>

                        ₹{summary.tax}

                    </span>

                </div>

                <div className="flex justify-between">

                    <span>

                        Delivery

                    </span>

                    <span>

                        ₹{summary.delivery_charge}

                    </span>

                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">

                    <span>

                        Total

                    </span>

                    <span>

                        ₹{summary.total_amount}

                    </span>

                </div>

            </div>

            <button

                onClick={handlePayment}

                className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"

            >

                <CreditCardIcon className="h-6 w-6"/>

                Proceed To Payment

            </button>

        </div>

    );

}

export default CheckoutSummary;