import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function AddressModal({

    isOpen,

    onClose,

    title,

    children,

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

                <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">

                    <div className="mb-6 flex items-center justify-between">

                        <DialogTitle className="text-2xl font-bold text-gray-900">

                            {title}

                        </DialogTitle>

                        <button
                            onClick={onClose}
                            className="rounded-lg px-3 py-2 text-xl font-bold text-gray-500 transition hover:bg-gray-100"
                        >
                            ✕
                        </button>

                    </div>

                    {children}

                </DialogPanel>

            </div>

        </Dialog>

    );

}

export default AddressModal;