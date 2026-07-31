import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import LoadingSpinner from "../../components/LoadingSpinner";

import {
    getProduct,
    updateProduct,
} from "../../services/adminProductService";

function EditProduct() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({

        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: null,

    });

    useEffect(() => {

        loadProduct();

    }, []);

    async function loadProduct() {

        try {

            const product = await getProduct(id);

            setFormData({

                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                image: null,

            });

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load product.");

        }

        finally {

            setLoading(false);

        }

    }

    function handleChange(event) {

        const { name, value, files } = event.target;

        if (name === "image") {

            setFormData({

                ...formData,

                image: files[0],

            });

        }

        else {

            setFormData({

                ...formData,

                [name]: value,

            });

        }

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("price", formData.price);
            data.append("stock", formData.stock);

            if (formData.image) {

                data.append("image", formData.image);

            }

            await updateProduct(id, data);

            toast.success("Product updated successfully.");

            navigate("/admin/products");

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to update product.");

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <div className="max-w-5xl">

            <h1 className="mb-8 text-4xl font-bold">

                Edit Product

            </h1>

            <form

                onSubmit={handleSubmit}

                className="rounded-2xl bg-white p-8 shadow"

            >

                <div className="grid gap-6">

                    <div>

                        <label className="mb-2 block font-semibold">

                            Product Name

                        </label>

                        <input

                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                            required

                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-semibold">

                            Description

                        </label>

                        <textarea

                            rows="5"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-xl border p-3"
                            required

                        />

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-semibold">

                                Category

                            </label>

                            <input

                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3"
                                required

                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold">

                                Price

                            </label>

                            <input

                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3"
                                required

                            />

                        </div>

                    </div>

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>

                            <label className="mb-2 block font-semibold">

                                Stock

                            </label>

                            <input

                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3"
                                required

                            />

                        </div>

                        <div>

                            <label className="mb-2 block font-semibold">

                                New Image (Optional)

                            </label>

                            <input

                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full rounded-xl border p-3"

                            />

                        </div>

                    </div>

                    <div className="flex gap-4">

                        <button

                            type="submit"
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"

                        >

                            Update Product

                        </button>

                        <button

                            type="button"

                            onClick={() => navigate("/admin/products")}

                            className="rounded-xl border px-6 py-3"

                        >

                            Cancel

                        </button>

                    </div>

                </div>

            </form>

        </div>

    );

}

export default EditProduct;