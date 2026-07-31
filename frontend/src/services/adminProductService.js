import api from "../api/api";

export async function getProduct(id) {

    const response = await api.get(

        `products/${id}/`

    );

    return response.data;

}

export async function createProduct(formData) {

    const response = await api.post(

        "products/create/",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

}

export async function updateProduct(id, formData) {

    const response = await api.patch(

        `products/${id}/update/`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data",

            },

        }

    );

    return response.data;

}

export async function deleteProduct(id) {

    const response = await api.delete(

        `products/${id}/delete/`

    );

    return response.data;

}