function LoadingSpinner() {

    return (

        <div className="flex min-h-[70vh] items-center justify-center">

            <div className="flex flex-col items-center">

                <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>

                <p className="mt-5 text-lg text-gray-600">

                    Loading products...

                </p>

            </div>

        </div>

    );

}

export default LoadingSpinner;