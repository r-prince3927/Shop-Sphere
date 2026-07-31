import api from "../api/api";

function getHeaders() {
    const token = localStorage.getItem("access");

    return {
        Authorization: `Bearer ${token}`,
    };
}

/**
 * Checkout Summary
 * POST /orders/checkout/
 */
export async function checkout(addressId) {
    const response = await api.post(
        "orders/checkout/",
        {
            address_id: addressId,
        },
        {
            headers: getHeaders(),
        }
    );

    return response.data;
}

/**
 * Get Logged In User Orders
 * GET /orders/
 */
export async function getOrders() {
    const response = await api.get("orders/", {
        headers: getHeaders(),
    });

    return response.data;
}

/**
 * Get Order Details
 */
export async function getOrder(orderId) {
    const response = await api.get(`orders/${orderId}/`, {
        headers: getHeaders(),
    });

    return response.data;
}