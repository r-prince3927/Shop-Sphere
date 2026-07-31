import { ShoppingCart, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useState } from "react";

import { addToCart } from "../services/cartService";

import {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
} from "../services/wishlistService";

function ProductCard(props) {

    const [wishlisted, setWishlisted] = useState(

        isWishlisted(props.id)

    );

    async function handleAddToCart(event) {

        event.preventDefault();

        try {

            await addToCart(props.id);

            toast.success("Product added to cart");

        }

        catch (error) {

            console.error(error);

            if (error.response?.status === 401) {

                toast.error("Please login first");

            }

            else {

                toast.error("Something went wrong");

            }

        }

    }

    function handleWishlist(event) {

        event.preventDefault();

        if (wishlisted) {

            removeFromWishlist(props.id);

            toast.success("Removed from wishlist");

        }

        else {

            addToWishlist({

                id: props.id,

                name: props.name,

                image: props.image,

                price: props.price,

                category: props.category,

                stock: props.stock,

            });

            toast.success("Added to wishlist");

        }

        setWishlisted(!wishlisted);

    }

    return (

        <Link to={`/products/${props.id}`}>

            <motion.div

                whileHover={{
                    y: -8,
                }}

                transition={{
                    duration: 0.25,
                }}

                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-2xl"

            >

                {/* Wishlist Button */}

                <button

                    onClick={handleWishlist}

                    className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow"

                >

                    <Heart

                        size={20}

                        className={

                            wishlisted

                                ? "fill-red-500 text-red-500"

                                : "text-gray-500"

                        }

                    />

                </button>

                {/* Product Image */}

                <div className="flex h-72 items-center justify-center overflow-hidden bg-gray-50 p-8">

                    <img

                        src={`http://127.0.0.1:8000${props.image}`}

                        alt={props.name}

                        className="h-56 object-contain transition duration-300 group-hover:scale-110"

                    />

                </div>

                {/* Details */}

                <div className="space-y-4 p-6">

                    <div>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">

                            {props.category}

                        </span>

                        <h3 className="mt-4 text-2xl font-bold text-gray-900">

                            {props.name}

                        </h3>

                    </div>

                    <div>

                        <span className="text-3xl font-bold text-gray-900">

                            ₹ {Number(props.price).toLocaleString("en-IN")}

                        </span>

                    </div>

                    <div>

                        {

                            props.stock > 0 ?

                            (

                                <span className="text-green-600 font-medium">

                                    In Stock

                                </span>

                            )

                            :

                            (

                                <span className="text-red-600 font-medium">

                                    Out of Stock

                                </span>

                            )

                        }

                    </div>

                    <div className="flex gap-3">

                        <button

                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"

                        >

                            <Eye size={18} />

                            View

                        </button>

                        <button

                            onClick={handleAddToCart}

                            disabled={props.stock === 0}

                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-semibold transition

                            ${

                                props.stock > 0

                                ?

                                "bg-blue-600 text-white hover:bg-blue-700"

                                :

                                "cursor-not-allowed bg-gray-300 text-gray-600"

                            }`}

                        >

                            <ShoppingCart size={18} />

                            Cart

                        </button>

                    </div>

                </div>

            </motion.div>

        </Link>

    );

}

export default ProductCard;