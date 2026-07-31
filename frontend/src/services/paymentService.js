import api from "../api/api";

function getHeaders() {
    const token = localStorage.getItem("access");

    return {
        Authorization: `Bearer ${token}`,
    };
}

/**
 * Create Razorpay Order
 */
export async function createPayment(addressId) {
    const response = await api.post(
        "orders/payment/create/",
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
 * Verify Razorpay Payment
 */
export async function verifyPayment({
    address_id,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
}) {
    const response = await api.post(
        "orders/payment/verify/",
        {
            address_id,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        },
        {
            headers: getHeaders(),
        }
    );

    return response.data;
}