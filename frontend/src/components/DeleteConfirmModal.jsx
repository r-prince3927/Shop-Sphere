import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            className="relative z-50"
        >
            {/* Background */}
            <div
                className="fixed inset-0 bg-black/40"
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">

                <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                    <div className="flex justify-center">

                        <div className="rounded-full bg-red-100 p-4">

                            <ExclamationTriangleIcon className="h-10 w-10 text-red-600" />

                        </div>

                    </div>

                    <DialogTitle className="mt-5 text-center text-2xl font-bold">

                        Delete Address

                    </DialogTitle>

                    <p className="mt-3 text-center text-gray-600">

                        Are you sure you want to delete this address?
                        This action cannot be undone.

                    </p>

                    <div className="mt-8 flex gap-3">

                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>

                    </div>

                </DialogPanel>

            </div>

        </Dialog>
    );
}

export default DeleteConfirmModal;