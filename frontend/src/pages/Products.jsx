import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";

import { getProducts } from "../services/productService";

function Products() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [ordering, setOrdering] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [page, setPage] = useState(1);

    const [nextPage, setNextPage] = useState(null);

    const [previousPage, setPreviousPage] = useState(null);

    useEffect(() => {

        loadProducts();

    }, []);

    async function loadProducts(

        searchText = search,
        categoryValue = category,
        orderingValue = ordering,
        min = minPrice,
        max = maxPrice,
        pageNumber = page

    ) {

        setLoading(true);

        try {

            const params = {

                page: pageNumber,

            };

            if (searchText)
                params.search = searchText;

            if (categoryValue)
                params.category = categoryValue;

            if (orderingValue)
                params.ordering = orderingValue;

            if (min)
                params.min_price = min;

            if (max)
                params.max_price = max;

            const data = await getProducts(params);

            setProducts(data.results);

            setNextPage(data.next);

            setPreviousPage(data.previous);

            setPage(pageNumber);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    function clearFilters() {

        setSearch("");
        setCategory("");
        setOrdering("");
        setMinPrice("");
        setMaxPrice("");

        loadProducts("", "", "", "", "", 1);

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <main className="mx-auto max-w-7xl px-6 py-16">

            <h1 className="text-5xl font-bold">

                Products

            </h1>

            <p className="mt-3 text-gray-600">

                Browse our premium collection.

            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input

                        type="text"

                        placeholder="Search..."

                        value={search}

                        onChange={(e) => {

                            setSearch(e.target.value);

                            loadProducts(
                                e.target.value,
                                category,
                                ordering,
                                minPrice,
                                maxPrice,
                                1
                            );

                        }}

                        className="w-full rounded-xl border py-3 pl-11 pr-4"

                    />

                </div>

                <select

                    value={category}

                    onChange={(e) => {

                        setCategory(e.target.value);

                        loadProducts(
                            search,
                            e.target.value,
                            ordering,
                            minPrice,
                            maxPrice,
                            1
                        );

                    }}

                    className="rounded-xl border px-4"

                >

                    <option value="">All Categories</option>

                    <option value="Mobiles">Mobiles</option>

                    <option value="Laptops">Laptops</option>

                    <option value="Accessories">Accessories</option>

                </select>

                <select

                    value={ordering}

                    onChange={(e) => {

                        setOrdering(e.target.value);

                        loadProducts(
                            search,
                            category,
                            e.target.value,
                            minPrice,
                            maxPrice,
                            1
                        );

                    }}

                    className="rounded-xl border px-4"

                >

                    <option value="">Sort By</option>

                    <option value="-id">Newest</option>

                    <option value="price">Price ↑</option>

                    <option value="-price">Price ↓</option>

                </select>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

                <input

                    type="number"

                    placeholder="Min Price"

                    value={minPrice}

                    onChange={(e) => setMinPrice(e.target.value)}

                    className="rounded-xl border px-4 py-3"

                />

                <input

                    type="number"

                    placeholder="Max Price"

                    value={maxPrice}

                    onChange={(e) => setMaxPrice(e.target.value)}

                    className="rounded-xl border px-4 py-3"

                />

                <button

                    onClick={() =>

                        loadProducts(

                            search,

                            category,

                            ordering,

                            minPrice,

                            maxPrice,

                            1

                        )

                    }

                    className="rounded-xl bg-blue-600 text-white"

                >

                    Apply Filters

                </button>

            </div>

            <div className="mt-4">

                <button

                    onClick={clearFilters}

                    className="rounded-lg bg-red-600 px-5 py-2 text-white"

                >

                    Clear Filters

                </button>

            </div>

            <div className="mt-12">

                {

                    products.length === 0 ?

                    (

                        <EmptyState

                            title="No Products"

                            description="Try another filter."

                        />

                    )

                    :

                    (

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                            {

                                products.map((product) => (

                                    <ProductCard

                                        key={product.id}

                                        id={product.id}

                                        name={product.name}

                                        image={product.image}

                                        category={product.category}

                                        stock={product.stock}

                                        price={product.price}

                                    />

                                ))

                            }

                        </div>

                    )

                }

            </div>

            <div className="mt-14 flex items-center justify-center gap-4">

                <button

                    disabled={!previousPage}

                    onClick={() =>
                        loadProducts(
                            search,
                            category,
                            ordering,
                            minPrice,
                            maxPrice,
                            page - 1
                        )
                    }

                    className="rounded-lg bg-gray-900 px-6 py-3 text-white disabled:opacity-40"

                >

                    Previous

                </button>

                <span className="font-semibold">

                    Page {page}

                </span>

                <button

                    disabled={!nextPage}

                    onClick={() =>
                        loadProducts(
                            search,
                            category,
                            ordering,
                            minPrice,
                            maxPrice,
                            page + 1
                        )
                    }

                    className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-40"

                >

                    Next

                </button>

            </div>

        </main>

    );

}

export default Products;