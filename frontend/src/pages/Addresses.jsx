import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/24/outline";

import AddressCard from "../components/AddressCard";
import AddressModal from "../components/AddressModal";
import AddressForm from "../components/AddressForm";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
} from "../services/addressService";

function Addresses() {

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);

    useEffect(() => {
        loadAddresses();
    }, []);

    async function loadAddresses() {

        try {

            const data = await getAddresses();

            setAddresses(data);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load addresses");

        }

    }

    async function handleSubmit(formData) {

        try {

            setLoading(true);

            if (editing) {

                await updateAddress(selectedAddress.id, formData);

                toast.success("Address updated successfully");

            }

            else {

                await addAddress(formData);

                toast.success("Address added successfully");

            }

            closeModal();

            await loadAddresses();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to save address");

        }

        finally {

            setLoading(false);

        }

    }

    function handleEdit(address) {

        setEditing(true);

        setSelectedAddress(address);

        setModalOpen(true);

    }

    function handleAdd() {

        setEditing(false);

        setSelectedAddress(null);

        setModalOpen(true);

    }

    function closeModal() {

        setEditing(false);

        setSelectedAddress(null);

        setModalOpen(false);

    }

    function handleDelete(id) {

        setAddressToDelete(id);

        setDeleteModalOpen(true);

    }

    async function confirmDelete() {

        try {

            setLoading(true);

            await deleteAddress(addressToDelete);

            toast.success("Address deleted successfully");

            setDeleteModalOpen(false);

            setAddressToDelete(null);

            await loadAddresses();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to delete address");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleMakeDefault(address) {

        try {

            await updateAddress(address.id, {
                ...address,
                is_default: true,
            });

            toast.success("Default address updated");

            await loadAddresses();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update default address");

        }

    }

    return (

        <main className="mx-auto max-w-6xl px-6 py-12">

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold">

                        My Addresses

                    </h1>

                    <p className="mt-2 text-gray-600">

                        Manage your saved delivery addresses.

                    </p>

                </div>

                <button

                    onClick={handleAdd}

                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"

                >

                    <PlusIcon className="h-5 w-5" />

                    Add Address

                </button>

            </div>

            {

                addresses.length === 0 ?

                (

                    <div className="rounded-2xl border bg-white p-12 text-center">

                        <h2 className="text-2xl font-semibold">

                            No Saved Addresses

                        </h2>

                        <p className="mt-3 text-gray-500">

                            Add your first delivery address.

                        </p>

                    </div>

                )

                :

                (

                    <div className="grid gap-6">

                        {

                            addresses.map((address) => (

                                <AddressCard

                                    key={address.id}

                                    address={address}

                                    onEdit={handleEdit}

                                    onDelete={handleDelete}

                                    onMakeDefault={handleMakeDefault}

                                />

                            ))

                        }

                    </div>

                )

            }

            <AddressModal

                isOpen={modalOpen}

                onClose={closeModal}

                title={editing ? "Edit Address" : "Add New Address"}

            >

                <AddressForm

                    initialData={selectedAddress}

                    onSubmit={handleSubmit}

                    loading={loading}

                />

            </AddressModal>

            <DeleteConfirmModal

                isOpen={deleteModalOpen}

                onClose={() => {

                    setDeleteModalOpen(false);

                    setAddressToDelete(null);

                }}

                onConfirm={confirmDelete}

                loading={loading}

            />

        </main>

    );

}

export default Addresses;