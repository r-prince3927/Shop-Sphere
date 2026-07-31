import api from "../api/api";

export async function getDashboardData() {

    const response = await api.get(
        "users/admin/dashboard/"
    );

    return response.data;

}