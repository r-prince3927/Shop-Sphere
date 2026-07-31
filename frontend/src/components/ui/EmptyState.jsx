function EmptyState({

    title,

    description,

}) {

    return (

        <div className="flex flex-col items-center justify-center py-24 text-center">

            <h2 className="text-3xl font-semibold text-gray-900">

                {title}

            </h2>

            <p className="mt-4 max-w-md text-gray-600">

                {description}

            </p>

        </div>

    );

}

export default EmptyState;