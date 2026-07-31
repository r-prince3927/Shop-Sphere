import { Star, Pencil, Trash2 } from "lucide-react";

function ReviewCard({

    review,

    currentUser,

    onEdit,

    onDelete,

}) {

    const isOwner = currentUser === review.user;

    return (

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div>

                    <h3 className="text-lg font-semibold">

                        {review.user}

                    </h3>

                    <p className="mt-1 text-sm text-gray-500">

                        {new Date(review.created_at).toLocaleDateString()}

                    </p>

                </div>

                <div className="flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <Star

                            key={star}

                            size={18}

                            className={

                                star <= review.rating

                                    ? "fill-yellow-400 text-yellow-400"

                                    : "text-gray-300"

                            }

                        />

                    ))}

                </div>

            </div>

            <p className="mt-5 leading-7 text-gray-700">

                {review.comment}

            </p>

            {

                isOwner && (

                    <div className="mt-6 flex gap-3">

                        <button

                            onClick={() => onEdit(review)}

                            className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"

                        >

                            <Pencil size={16} />

                            Edit

                        </button>

                        <button

                            onClick={() => onDelete(review.id)}

                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"

                        >

                            <Trash2 size={16} />

                            Delete

                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default ReviewCard;