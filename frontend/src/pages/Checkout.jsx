import { useEffect, useState } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

import { getAddresses } from "../services/addressService";
import { checkout } from "../services/orderService";

import CheckoutAddressSelector from "../components/CheckoutAddressSelector";
import CheckoutSummary from "../components/CheckoutSummary";

function Checkout() {

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [summary, setSummary] = useState(null);

    const [loadingAddresses, setLoadingAddresses] = useState(true);

    const [loadingSummary, setLoadingSummary] = useState(false);

    const [error, setError] = useState("");



    /*
    ==========================================
    Load Addresses
    ==========================================
    */

    useEffect(() => {

        loadAddresses();

    }, []);



    async function loadAddresses() {

        try {

            setLoadingAddresses(true);

            const data = await getAddresses();

            setAddresses(data);

            if (data.length > 0) {

                const defaultAddress =

                    data.find(address => address.is_default)

                    || data[0];

                setSelectedAddress(defaultAddress.id);

            }

        }

        catch (err) {

            console.error(err);

            setError("Unable to load addresses.");

        }

        finally {

            setLoadingAddresses(false);

        }

    }



    /*
    ==========================================
    Load Checkout Summary
    ==========================================
    */

    useEffect(() => {

        if (selectedAddress) {

            loadSummary(selectedAddress);

        }

    }, [selectedAddress]);



    async function loadSummary(addressId) {

        try {

            setLoadingSummary(true);

            const response = await checkout(addressId);

            setSummary(response);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load checkout summary.");

        }

        finally {

            setLoadingSummary(false);

        }

    }



    /*
    ==========================================
    Address Selected
    ==========================================
    */

    function handleAddressChange(id) {

        setSelectedAddress(id);

    }



    /*
    ==========================================
    UI
    ==========================================
    */

    return (

        <main className="min-h-screen bg-gray-100 py-10">

            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}

                <div className="mb-10 flex items-center gap-4">

                    <div className="rounded-full bg-blue-100 p-3">

                        <ShoppingBagIcon className="h-8 w-8 text-blue-600"/>

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold">

                            Checkout

                        </h1>

                        <p className="text-gray-500">

                            Review your order before payment

                        </p>

                    </div>

                </div>



                {

                    error &&

                    <div
                        className="mb-6 rounded-lg bg-red-100 p-4 text-red-700"
                    >
                        {error}
                    </div>

                }



                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Left Side */}

                    <div className="lg:col-span-2">

                        <CheckoutAddressSelector

                            addresses={addresses}

                            selectedAddress={selectedAddress}

                            loading={loadingAddresses}

                            onSelect={handleAddressChange}

                        />

                    </div>



                    {/* Right Side */}

                    <div>

                        <CheckoutSummary

                            summary={summary}

                            loading={loadingSummary}

                            addressId={selectedAddress}

                        />

                    </div>

                </div>

            </div>

        </main>

    );

}

export default Checkout;