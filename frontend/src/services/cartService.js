import api from "../api/api";

/*
==========================================
Add Product to Cart
==========================================
*/

export async function addToCart(productId, quantity = 1) {

    const token = localStorage.getItem("access");

    const response = await api.post(

        "cart/add/",

        {
            product_id: productId,
            quantity,
        },

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}

/*
==========================================
Get Cart
==========================================
*/

export async function getCart() {

    const token = localStorage.getItem("access");

    const response = await api.get(

        "cart/",

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}

/*
==========================================
Update Cart Item Quantity
==========================================
*/

export async function updateCartItem(cartItemId, quantity) {

    const token = localStorage.getItem("access");

    const response = await api.patch(

        `cart/item/${cartItemId}/`,

        {
            quantity,
        },

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}

/*
==========================================
Delete Cart Item
==========================================
*/

export async function removeCartItem(cartItemId) {

    const token = localStorage.getItem("access");

    const response = await api.delete(

        `cart/item/${cartItemId}/delete/`,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}