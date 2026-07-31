import {
    PencilSquareIcon,
    TrashIcon,
    CheckBadgeIcon,
    MapPinIcon,
} from "@heroicons/react/24/outline";

function AddressCard({
    address,
    onEdit,
    onDelete,
    onMakeDefault,
}) {

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">

            <div className="flex justify-between items-start">

                <div className="flex gap-3">

                    <div className="rounded-full bg-blue-100 p-3">

                        <MapPinIcon className="h-6 w-6 text-blue-600"/>

                    </div>

                    <div>

                        <h2 className="text-xl font-bold">

                            {address.full_name}

                        </h2>

                        <p className="text-gray-500">

                            {address.phone_number}

                        </p>

                    </div>

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => onEdit(address)}
                        className="rounded-lg p-2 hover:bg-blue-100"
                    >
                        <PencilSquareIcon className="h-5 w-5 text-blue-600"/>
                    </button>

                    <button
                        onClick={() => onDelete(address.id)}
                        className="rounded-lg p-2 hover:bg-red-100"
                    >
                        <TrashIcon className="h-5 w-5 text-red-600"/>
                    </button>

                </div>

            </div>

            <div className="mt-5 space-y-1 text-gray-700">

                <p>{address.address_line_1}</p>

                {address.address_line_2 &&
                    <p>{address.address_line_2}</p>
                }

                <p>

                    {address.city}, {address.state}

                </p>

                <p>{address.postal_code}</p>

                <p>{address.country}</p>

            </div>

            <div className="mt-5">

                {

                    address.is_default ?

                    (

                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                            <CheckBadgeIcon className="h-5 w-5"/>

                            Default Address

                        </span>

                    )

                    :

                    (

                        <button

                            onClick={() => onMakeDefault(address)}

                            className="rounded-lg border border-blue-600 px-4 py-2 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition"

                        >

                            Make Default

                        </button>

                    )

                }

            </div>

        </div>

    );

}

export default AddressCard;