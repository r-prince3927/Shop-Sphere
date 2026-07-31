import api from "../api/api";

export async function getUsers() {

    const response = await api.get(

        "users/admin/users/"

    );

    return response.data;

}

export async function updateUser(id, is_staff) {

    const response = await api.patch(

        `users/admin/users/${id}/`,

        {
            is_staff,
        }

    );

    return response.data;

}