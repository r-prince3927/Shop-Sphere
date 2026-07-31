import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import ReviewCard from "../components/ReviewCard";

import {
    getRelatedProducts,
} from "../services/productService";

import {
    getProduct,
    createReview,
    updateReview,
    deleteReview,
} from "../services/reviewService";

import { addToCart } from "../services/cartService";

import { saveRecentlyViewed } from "../utils/recentlyViewed";

function ProductDetails() {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const [editingReview, setEditingReview] = useState(null);

    const currentUser = localStorage.getItem("email");

    useEffect(() => {

        loadPage();

    }, [id]);

    async function loadPage() {

        setLoading(true);

        try {

            const productData = await getProduct(id);

            saveRecentlyViewed(productData);

            const allProducts = await getRelatedProducts();

            setProduct(productData);

            const filtered = allProducts.filter(

                (item) => item.id !== productData.id

            );

            setRelatedProducts(

                filtered.slice(0, 4)

            );

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load product");

        }

        finally {

            setLoading(false);

        }

    }

    async function handleAddToCart() {

        try {

            await addToCart(product.id);

            toast.success(

                "Product added to cart"

            );

        }

        catch (error) {

            toast.error(

                "Please login first"

            );

        }

    }

    async function handleReviewSubmit() {

        try {

            if (editingReview) {

                await updateReview(

                    editingReview.id,

                    {

                        rating,

                        comment,

                    }

                );

                toast.success(

                    "Review updated"

                );

            }

            else {

                await createReview(

                    product.id,

                    {

                        rating,

                        comment,

                    }

                );

                toast.success(

                    "Review submitted"

                );

            }

            setRating(5);

            setComment("");

            setEditingReview(null);

            loadPage();

        }

        catch (error) {

            console.error(error);

            toast.error(

                error.response?.data?.error ||

                "Unable to submit review"

            );

        }

    }

    function handleEdit(review) {

        setEditingReview(review);

        setRating(review.rating);

        setComment(review.comment);

        window.scrollTo({

            top: 650,

            behavior: "smooth",

        });

    }

    async function handleDelete(reviewId) {

        if (

            !window.confirm(

                "Delete this review?"

            )

        )

            return;

        try {

            await deleteReview(reviewId);

            toast.success(

                "Review deleted"

            );

            loadPage();

        }

        catch (error) {

            toast.error(

                "Unable to delete review"

            );

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

    <main className="mx-auto max-w-7xl px-6 py-16">

        {/* Product */}

        <div className="grid gap-14 lg:grid-cols-2">

            <div className="flex items-center justify-center rounded-3xl bg-gray-100 p-10">

                <img

                    src={`http://127.0.0.1:8000${product.image}`}

                    alt={product.name}

                    className="max-h-[500px] object-contain"

                />

            </div>

            <div>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                    {product.category}

                </span>

                <h1 className="mt-6 text-5xl font-bold">

                    {product.name}

                </h1>

                <div className="mt-5 flex items-center gap-3">

                    <div className="flex">

                        {[1, 2, 3, 4, 5].map((star) => (

                            <Star

                                key={star}

                                size={22}

                                className={

                                    star <= Math.round(product.average_rating)

                                        ? "fill-yellow-400 text-yellow-400"

                                        : "text-gray-300"

                                }

                            />

                        ))}

                    </div>

                    <span className="font-semibold">

                        {product.average_rating}

                    </span>

                    <span className="text-gray-500">

                        ({product.review_count} Reviews)

                    </span>

                </div>

                <p className="mt-6 text-4xl font-bold text-blue-700">

                    ₹ {Number(product.price).toLocaleString("en-IN")}

                </p>

                <p className="mt-8 leading-8 text-gray-600">

                    {product.description}

                </p>

                <div className="mt-8">

                    {

                        product.stock > 0 ?

                            (

                                <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

                                    In Stock ({product.stock})

                                </span>

                            )

                            :

                            (

                                <span className="rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">

                                    Out of Stock

                                </span>

                            )

                    }

                </div>

                <button

                    onClick={handleAddToCart}

                    disabled={product.stock === 0}

                    className={`mt-10 rounded-xl px-8 py-4 font-semibold transition

                    ${

                        product.stock

                            ?

                            "bg-blue-600 text-white hover:bg-blue-700"

                            :

                            "cursor-not-allowed bg-gray-300"

                    }`}

                >

                    <div className="flex items-center gap-2">

                        <ShoppingCart size={20} />

                        Add to Cart

                    </div>

                </button>

            </div>

        </div>

        {/* Review Form */}

        <section className="mt-24">

            <h2 className="mb-8 text-3xl font-bold">

                {

                    editingReview

                        ?

                        "Edit Review"

                        :

                        "Write a Review"

                }

            </h2>

            <div className="rounded-2xl bg-white p-8 shadow">

                <label className="font-semibold">

                    Rating

                </label>

                <div className="mt-3 mb-6 flex gap-2">

                    {

                        [1, 2, 3, 4, 5].map((star) => (

                            <Star

                                key={star}

                                size={30}

                                onClick={() =>

                                    setRating(star)

                                }

                                className={`cursor-pointer

                                ${

                                    star <= rating

                                        ?

                                        "fill-yellow-400 text-yellow-400"

                                        :

                                        "text-gray-300"

                                }`}

                            />

                        ))

                    }

                </div>

                <textarea

                    rows={5}

                    value={comment}

                    onChange={(e) =>

                        setComment(

                            e.target.value

                        )

                    }

                    placeholder="Write your review..."

                    className="w-full rounded-xl border p-4"

                />

                <button

                    onClick={handleReviewSubmit}

                    className="mt-6 rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"

                >

                    {

                        editingReview

                            ?

                            "Update Review"

                            :

                            "Submit Review"

                    }

                </button>

            </div>

        </section>

        {/* Reviews */}

        <section className="mt-24">

            <h2 className="mb-8 text-4xl font-bold">

                Customer Reviews

            </h2>

            {

                product.reviews.length === 0 ?

                    (

                        <p className="text-gray-500">

                            No reviews yet.

                        </p>

                    )

                    :

                    (

                        <div className="grid gap-6">

                            {

                                product.reviews.map((review) => (

                                    <ReviewCard

                                        key={review.id}

                                        review={review}

                                        currentUser={currentUser}

                                        onEdit={handleEdit}

                                        onDelete={handleDelete}

                                    />

                                ))

                            }

                        </div>

                    )

            }

        </section>

        {/* Related */}

        <section className="mt-24">

            <h2 className="mb-8 text-4xl font-bold">

                Related Products

            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                {

                    relatedProducts.map((item) => (

                        <ProductCard

                            key={item.id}

                            id={item.id}

                            name={item.name}

                            image={item.image}

                            price={item.price}

                            stock={item.stock}

                            category={item.category}

                        />

                    ))

                }

            </div>

        </section>

    </main>

);

}

export default ProductDetails;