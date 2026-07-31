import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createProduct } from "../../services/adminProductService";

function AddProduct() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: null,

    });

    function handleChange(event) {

        const { name, value } = event.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    }

    function handleImage(event) {

        setFormData({

            ...formData,

            image: event.target.files[0],

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);

        try {

            const data = new FormData();

            data.append("name", formData.name);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("price", formData.price);
            data.append("stock", formData.stock);
            data.append("image", formData.image);

            await createProduct(data);

            toast.success("Product added successfully!");

            navigate("/admin/products");

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to create product.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="mx-auto max-w-3xl">

            <h1 className="mb-8 text-4xl font-bold">

                Add Product

            </h1>

            <form

                onSubmit={handleSubmit}

                className="space-y-6 rounded-2xl bg-white p-8 shadow"

            >

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

                        name="description"

                        rows="5"

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

                        <select

                            name="category"

                            value={formData.category}

                            onChange={handleChange}

                            className="w-full rounded-xl border p-3"

                            required

                        >

                            <option value="">

                                Select Category

                            </option>

                            <option value="Mobiles">

                                Mobiles

                            </option>

                            <option value="Laptops">

                                Laptops

                            </option>

                            <option value="Accessories">

                                Accessories

                            </option>

                        </select>

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

                            Product Image

                        </label>

                        <input

                            type="file"

                            accept="image/*"

                            onChange={handleImage}

                            className="w-full rounded-xl border p-3"

                            required

                        />

                    </div>

                </div>

                <div className="flex gap-4">

                    <button

                        type="submit"

                        disabled={loading}

                        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"

                    >

                        {

                            loading

                                ? "Saving..."

                                : "Save Product"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={() => navigate("/admin/products")}

                        className="rounded-xl border px-8 py-3"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}

export default AddProduct;