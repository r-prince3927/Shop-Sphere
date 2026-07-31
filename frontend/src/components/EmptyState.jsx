import { PackageSearch } from "lucide-react";

function EmptyState({

    title,

    description,

}) {

    return (

        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">

            <PackageSearch

                size={80}

                className="text-gray-400"

            />

            <h2 className="mt-6 text-3xl font-bold text-gray-800">

                {title}

            </h2>

            <p className="mt-3 max-w-md text-center text-gray-500">

                {description}

            </p>

        </div>

    );

}

export default EmptyState;