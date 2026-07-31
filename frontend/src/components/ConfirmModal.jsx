import { AlertTriangle } from "lucide-react";

function ConfirmModal({

    open,

    title,

    message,

    onCancel,

    onConfirm,

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

                <div className="flex items-center gap-3">

                    <AlertTriangle

                        size={34}

                        className="text-red-600"

                    />

                    <h2 className="text-2xl font-bold">

                        {title}

                    </h2>

                </div>

                <p className="mt-6 text-gray-600">

                    {message}

                </p>

                <div className="mt-8 flex justify-end gap-4">

                    <button

                        onClick={onCancel}

                        className="rounded-xl border px-5 py-2"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={onConfirm}

                        className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;