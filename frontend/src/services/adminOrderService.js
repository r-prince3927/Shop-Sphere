import api from "../api/api";

export async function getAdminOrders() {

    const response = await api.get(
        "orders/admin/all/"
    );

    return response.data;

}

export async function updateOrderStatus(id, status) {

    const response = await api.patch(

        `orders/admin/${id}/`,

        {
            status,
        }

    );

    return response.data;

}