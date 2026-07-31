import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

import { getWishlist } from "../services/wishlistService";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {

        loadWishlist();

    }, []);

    function loadWishlist() {

        setWishlist(getWishlist());

    }

    return (

        <main className="mx-auto max-w-7xl px-6 py-16">

            <h1 className="text-5xl font-bold text-gray-900">

                My Wishlist

            </h1>

            <p className="mt-3 text-lg text-gray-600">

                Your favourite products saved for later.

            </p>

            <div className="mt-12">

                {

                    wishlist.length === 0 ?

                    (

                        <EmptyState

                            title="Wishlist is Empty"

                            description="Add products by clicking the ❤️ button."

                        />

                    )

                    :

                    (

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {

                                wishlist.map((product) => (

                                    <ProductCard

                                        key={product.id}

                                        id={product.id}

                                        name={product.name}

                                        image={product.image}

                                        price={product.price}

                                        stock={product.stock}

                                        category={product.category}

                                    />

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </main>

    );

}

export default Wishlist;