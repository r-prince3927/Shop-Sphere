import { PackageCheck } from "lucide-react";

function OrderCard({ order }) {

    const badgeColor =

        order.status === "PAID"

            ? "bg-green-100 text-green-700"

            : order.status === "PENDING"

            ? "bg-yellow-100 text-yellow-700"

            : "bg-gray-100 text-gray-700";

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <div className="flex flex-wrap items-center justify-between gap-4">

                <div>

                    <h2 className="text-2xl font-bold">

                        Order #{order.id}

                    </h2>

                    <p className="mt-2 text-gray-500">

                        {new Date(order.created_at).toLocaleString()}

                    </p>

                </div>

                <span

                    className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor}`}

                >

                    {order.status}

                </span>

            </div>

            <hr className="my-8" />

            <div className="space-y-5">

                {

                    order.items.map((item) => (

                        <div

                            key={item.product}

                            className="flex items-center justify-between"

                        >

                            <div>

                                <h3 className="text-lg font-semibold">

                                    {item.product}

                                </h3>

                                <p className="text-gray-500">

                                    Qty : {item.quantity}

                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-semibold">

                                    ₹ {Number(item.purchase_price).toLocaleString("en-IN")}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

            <div className="mt-8 flex items-center justify-end gap-3">

                <PackageCheck

                    size={22}

                    className="text-green-600"

                />

                <span className="font-semibold text-green-600">

                    Order Confirmed

                </span>

            </div>

        </div>

    );

}

export default OrderCard;