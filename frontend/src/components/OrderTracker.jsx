function OrderTracker({ status }) {

    const steps = [

        "Ordered",

        "Packed",

        "Shipped",

        "Out for Delivery",

        "Delivered",

    ];

    const currentStep = steps.indexOf(status);

    return (

        <div className="mt-6">

            {

                steps.map((step, index) => (

                    <div

                        key={step}

                        className="flex items-center gap-4 mb-4"

                    >

                        <div

                            className={`h-5 w-5 rounded-full

                            ${

                                index <= currentStep

                                    ? "bg-green-500"

                                    : "bg-gray-300"

                            }`}

                        />

                        <span

                            className={

                                index <= currentStep

                                    ? "font-semibold text-green-600"

                                    : "text-gray-500"

                            }

                        >

                            {step}

                        </span>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderTracker;