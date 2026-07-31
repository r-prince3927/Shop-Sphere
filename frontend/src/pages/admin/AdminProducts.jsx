import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import LoadingSpinner from "../../components/LoadingSpinner";
import ConfirmModal from "../../components/ConfirmModal";

import { getProducts } from "../../services/productService";
import { deleteProduct } from "../../services/adminProductService";

function AdminProducts() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {

        loadProducts();

    }, []);

    async function loadProducts() {

        try {

            const data = await getProducts();

            setProducts(data.results);

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to load products");

        }

        finally {

            setLoading(false);

        }

    }

    function handleDeleteClick(product) {

        setSelectedProduct(product);

        setShowModal(true);

    }

    async function confirmDelete() {

        try {

            await deleteProduct(selectedProduct.id);

            toast.success("Product deleted successfully.");

            setShowModal(false);

            setSelectedProduct(null);

            loadProducts();

        }

        catch (error) {

            console.error(error);

            const message =

                error.response?.data?.error ||

                "Unable to delete product.";

            toast.error(message);

            setShowModal(false);

        }

    }

    if (loading) {

        return <LoadingSpinner />;

    }

    return (

        <>

            <ConfirmModal

                open={showModal}

                title="Delete Product"

                message={`Are you sure you want to delete "${selectedProduct?.name}" ?`}

                onCancel={() => {

                    setShowModal(false);

                    setSelectedProduct(null);

                }}

                onConfirm={confirmDelete}

            />

            <div>

                <div className="mb-8 flex items-center justify-between">
                    
                        Product Management
                    <button

                        onClick={() => navigate("/admin/products/add")}

                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

                    >

                        <Plus size={20} />

                        Add Product

                    </button>

                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="px-6 py-4 text-left">

                                    Image

                                </th>

                                <th className="px-6 py-4 text-left">

                                    Product

                                </th>

                                <th className="px-6 py-4 text-left">

                                    Category

                                </th>

                                <th className="px-6 py-4 text-left">

                                    Price

                                </th>

                                <th className="px-6 py-4 text-left">

                                    Stock

                                </th>

                                <th className="px-6 py-4 text-center">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                products.map((product) => (

                                    <tr

                                        key={product.id}

                                        className="border-t hover:bg-gray-50"

                                    >

                                        <td className="px-6 py-4">

                                            <img

                                                src={`http://127.0.0.1:8000${product.image}`}

                                                alt={product.name}

                                                className="h-16 w-16 rounded-lg object-cover"

                                            />

                                        </td>

                                        <td className="px-6 py-4 font-semibold">

                                            {product.name}

                                        </td>

                                        <td className="px-6 py-4">

                                            {product.category}

                                        </td>

                                        <td className="px-6 py-4">

                                            ₹ {Number(product.price).toLocaleString("en-IN")}

                                        </td>

                                        <td className="px-6 py-4">

                                            {product.stock}

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex justify-center gap-3">

                                                <button

                                                    onClick={() =>

                                                        navigate(`/admin/products/edit/${product.id}`)

                                                    }

                                                    className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"

                                                >

                                                    <Pencil size={18} />

                                                </button>

                                                <button

                                                    onClick={() =>

                                                        handleDeleteClick(product)

                                                    }

                                                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"

                                                >

                                                    <Trash2 size={18} />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default AdminProducts;