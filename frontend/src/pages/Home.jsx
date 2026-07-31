import { Link } from "react-router-dom";
import { useMemo } from "react";
import { ArrowRight, Package, ShieldCheck, Truck, History } from "lucide-react";
import { motion } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { getRecentlyViewed } from "../utils/recentlyViewed";

function Home({ products }) {

    const recentlyViewed = useMemo(() => {

        return getRecentlyViewed();

    }, []);

    return (

        <main>

            {/* Hero Section */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-800">

                <div className="mx-auto flex min-h-[80vh] max-w-7xl items-center px-6">

                    <div className="max-w-3xl">

                        <motion.h1

                            initial={{ opacity: 0, y: -30 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ duration: 0.6 }}

                            className="text-5xl font-extrabold leading-tight text-white md:text-7xl"

                        >

                            Premium Electronics

                            <br />

                            For Everyday Life

                        </motion.h1>

                        <motion.p

                            initial={{ opacity: 0, y: 20 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{ delay: 0.2 }}

                            className="mt-8 max-w-2xl text-xl leading-9 text-blue-100"

                        >

                            Discover smartphones, laptops, accessories and premium gadgets carefully selected for quality, performance and reliability.

                        </motion.p>

                        <motion.div

                            initial={{ opacity: 0 }}

                            animate={{ opacity: 1 }}

                            transition={{ delay: 0.4 }}

                            className="mt-10"

                        >

                            <Link

                                to="/products"

                                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 transition hover:scale-105"

                            >

                                Explore Products

                                <ArrowRight size={22} />

                            </Link>

                        </motion.div>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="bg-white py-16">

                <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">

                    <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">

                        <Package

                            size={42}

                            className="text-blue-600"

                        />

                        <h3 className="mt-5 text-2xl font-bold">

                            Premium Products

                        </h3>

                        <p className="mt-3 text-gray-600">

                            Carefully selected electronics from trusted brands.

                        </p>

                    </div>

                    <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">

                        <Truck

                            size={42}

                            className="text-blue-600"

                        />

                        <h3 className="mt-5 text-2xl font-bold">

                            Fast Delivery

                        </h3>

                        <p className="mt-3 text-gray-600">

                            Quick and secure shipping across India.

                        </p>

                    </div>

                    <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">

                        <ShieldCheck

                            size={42}

                            className="text-blue-600"

                        />

                        <h3 className="mt-5 text-2xl font-bold">

                            Genuine Warranty

                        </h3>

                        <p className="mt-3 text-gray-600">

                            Every product comes with official manufacturer warranty.

                        </p>

                    </div>

                </div>

            </section>

            {/* Featured Products */}

            <section className="mx-auto max-w-7xl px-6 py-20">

                <div className="mb-14">

                    <h2 className="text-4xl font-bold text-gray-900">

                        Featured Products

                    </h2>

                    <p className="mt-3 text-lg text-gray-600">

                        Handpicked products from our latest collection.

                    </p>

                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                    {

                        products.slice(0, 6).map((product) => (

                            <ProductCard

                                key={product.id}

                                id={product.id}

                                name={product.name}

                                price={product.price}

                                image={product.image}

                                category={product.category}

                                stock={product.stock}

                            />

                        ))

                    }

                </div>

            </section>

            {/* Recently Viewed */}

            {

                recentlyViewed.length > 0 && (

                    <section className="mx-auto max-w-7xl px-6 pb-20">

                        <div className="mb-14 flex items-center gap-3">

                            <History

                                size={34}

                                className="text-blue-600"

                            />

                            <div>

                                <h2 className="text-4xl font-bold text-gray-900">

                                    Recently Viewed

                                </h2>

                                <p className="mt-2 text-lg text-gray-600">

                                    Continue exploring products you've recently viewed.

                                </p>

                            </div>

                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                            {

                                recentlyViewed.map((product) => (

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

                    </section>

                )

            }

        </main>

    );

}

export default Home;