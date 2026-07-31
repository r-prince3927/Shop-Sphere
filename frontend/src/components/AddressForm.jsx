import { useState, useEffect } from "react";

const emptyForm = {
    full_name: "",
    phone_number: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    is_default: false,
};

function AddressForm({
    initialData,
    onSubmit,
    loading,
}) {

    const [form, setForm] = useState(emptyForm);

    useEffect(() => {

        if (initialData) {

            setForm({
                full_name: initialData.full_name || "",
                phone_number: initialData.phone_number || "",
                address_line_1: initialData.address_line_1 || "",
                address_line_2: initialData.address_line_2 || "",
                city: initialData.city || "",
                state: initialData.state || "",
                postal_code: initialData.postal_code || "",
                country: initialData.country || "India",
                is_default: initialData.is_default || false,
            });

        } else {

            setForm(emptyForm);

        }

    }, [initialData]);

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >

            <div>

                <label className="mb-1 block font-medium">
                    Full Name
                </label>

                <input
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    Phone Number
                </label>

                <input
                    type="text"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    Address Line 1
                </label>

                <input
                    type="text"
                    name="address_line_1"
                    value={form.address_line_1}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

            </div>

            <div>

                <label className="mb-1 block font-medium">
                    Address Line 2
                </label>

                <input
                    type="text"
                    name="address_line_2"
                    value={form.address_line_2}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                />

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="mb-1 block font-medium">
                        City
                    </label>

                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />

                </div>

                <div>

                    <label className="mb-1 block font-medium">
                        State
                    </label>

                    <input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />

                </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="mb-1 block font-medium">
                        Postal Code
                    </label>

                    <input
                        type="text"
                        name="postal_code"
                        value={form.postal_code}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />

                </div>

                <div>

                    <label className="mb-1 block font-medium">
                        Country
                    </label>

                    <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />

                </div>

            </div>

            <label className="flex items-center gap-3">

                <input
                    type="checkbox"
                    name="is_default"
                    checked={form.is_default}
                    onChange={handleChange}
                />

                Set as Default Address

            </label>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

                {loading ? "Saving..." : "Save Address"}

            </button>

        </form>

    );

}

export default AddressForm;