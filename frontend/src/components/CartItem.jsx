import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import {
    updateCartItem,
    removeCartItem,
} from "../services/cartService";

function CartItem({ item, refreshCart }) {

    async function increaseQuantity() {

        try {

            await updateCartItem(
                item.id,
                item.quantity + 1
            );

            refreshCart();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update quantity");

        }

    }

    async function decreaseQuantity() {

        if (item.quantity === 1) {

            return;

        }

        try {

            await updateCartItem(
                item.id,
                item.quantity - 1
            );

            refreshCart();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update quantity");

        }

    }

    async function deleteItem() {

        try {

            await removeCartItem(item.id);

            toast.success("Item removed");

            refreshCart();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to remove item");

        }

    }

    return (

        <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row">

            {/* Product Image */}

            <div className="flex h-40 w-full items-center justify-center rounded-xl bg-gray-100 md:w-44">

                <img

                    src={`http://127.0.0.1:8000${item.product.image}`}

                    alt={item.product.name}

                    className="h-32 object-contain"

                />

            </div>

            {/* Product Details */}

            <div className="flex flex-1 flex-col justify-between">

                <div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">

                        {item.product.category}

                    </span>

                    <h2 className="mt-4 text-2xl font-bold text-gray-900">

                        {item.product.name}

                    </h2>

                    <p className="mt-3 text-lg text-blue-700 font-semibold">

                        ₹ {Number(item.product.price).toLocaleString("en-IN")}

                    </p>

                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-6">

                    {/* Quantity */}

                    <div className="flex items-center rounded-xl border">

                        <button

                            onClick={decreaseQuantity}

                            className="p-3 hover:bg-gray-100"

                        >

                            <Minus size={18} />

                        </button>

                        <span className="px-5 font-semibold">

                            {item.quantity}

                        </span>

                        <button

                            onClick={increaseQuantity}

                            className="p-3 hover:bg-gray-100"

                        >

                            <Plus size={18} />

                        </button>

                    </div>

                    {/* Subtotal */}

                    <div>

                        <p className="text-gray-500">

                            Subtotal

                        </p>

                        <p className="text-2xl font-bold">

                            ₹ {Number(item.subtotal).toLocaleString("en-IN")}

                        </p>

                    </div>

                    {/* Remove */}

                    <button

                        onClick={deleteItem}

                        className="flex items-center gap-2 rounded-lg border border-red-500 px-5 py-3 text-red-600 transition hover:bg-red-600 hover:text-white"

                    >

                        <Trash2 size={18} />

                        Remove

                    </button>

                </div>

            </div>

        </div>

    );

}

export default CartItem;