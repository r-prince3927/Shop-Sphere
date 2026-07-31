import { Link } from "react-router-dom";

import {
    MapPinIcon,
    CheckBadgeIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";

function CheckoutAddressSelector({

    addresses,

    selectedAddress,

    loading,

    onSelect,

}) {

    /*
    ==========================================
    Loading State
    ==========================================
    */

    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-6 shadow">

                <div className="mb-6 h-8 w-60 animate-pulse rounded bg-gray-200" />

                <div className="space-y-5">

                    {[1, 2, 3].map((item) => (

                        <div
                            key={item}
                            className="rounded-xl border border-gray-200 p-6"
                        >

                            <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />

                            <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />

                            <div className="mt-2 h-4 w-40 animate-pulse rounded bg-gray-200" />

                        </div>

                    ))}

                </div>

            </div>

        );

    }

    /*
    ==========================================
    Empty State
    ==========================================
    */

    if (addresses.length === 0) {

        return (

            <div className="rounded-2xl bg-white p-10 shadow text-center">

                <MapPinIcon className="mx-auto h-16 w-16 text-gray-400" />

                <h2 className="mt-5 text-2xl font-bold">

                    No Address Found

                </h2>

                <p className="mt-2 text-gray-500">

                    Please add a delivery address before placing your order.

                </p>

                <Link
                    to="/addresses"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >

                    <PlusIcon className="h-5 w-5" />

                    Add Address

                </Link>

            </div>

        );

    }

    /*
    ==========================================
    Main UI
    ==========================================
    */

    return (

        <div className="rounded-2xl bg-white p-6 shadow">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-bold">

                    Select Delivery Address

                </h2>

                <Link
                    to="/addresses"
                    className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >

                    + Add New

                </Link>

            </div>

            <div className="space-y-5">

                {addresses.map((address) => (

                    <label
                        key={address.id}
                        className={`block cursor-pointer rounded-xl border p-5 transition-all ${
                            selectedAddress === address.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                        }`}
                    >

                        <div className="flex items-start gap-4">

                            <input
                                type="radio"
                                checked={selectedAddress === address.id}
                                onChange={() => onSelect(address.id)}
                                className="mt-2 h-5 w-5"
                            />

                            <div className="flex-1">

                                <div className="flex flex-wrap items-center gap-3">

                                    <h3 className="text-lg font-bold">

                                        {address.full_name}

                                    </h3>

                                    {address.is_default && (

                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                            <CheckBadgeIcon className="h-4 w-4" />

                                            Default

                                        </span>

                                    )}

                                </div>

                                <p className="mt-2 text-gray-600">

                                    {address.phone_number}

                                </p>

                                <p className="mt-2 text-gray-700">

                                    {address.address_line_1}

                                </p>

                                {address.address_line_2 && (

                                    <p className="text-gray-700">

                                        {address.address_line_2}

                                    </p>

                                )}

                                <p className="mt-1 text-gray-700">

                                    {address.city}, {address.state}

                                </p>

                                <p className="text-gray-700">

                                    {address.postal_code}

                                </p>

                                <p className="text-gray-700">

                                    {address.country}

                                </p>

                            </div>

                        </div>

                    </label>

                ))}

            </div>

        </div>

    );

}

export default CheckoutAddressSelector;