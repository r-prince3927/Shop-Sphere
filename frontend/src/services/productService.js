import api from "../api/api";

/*
==========================================
Get Products
==========================================
*/

export async function getProducts(params = {}) {

    const response = await api.get(

        "products/",

        {

            params,

        }

    );

    return response.data;

}

/*
==========================================
Get Single Product
==========================================
*/

export async function getProduct(id) {

    const response = await api.get(

        `products/${id}/`

    );

    return response.data;

}

/*
==========================================
Related Products
==========================================
*/

export async function getRelatedProducts() {

    const response = await api.get(

        "products/"

    );

    return response.data.results;

}