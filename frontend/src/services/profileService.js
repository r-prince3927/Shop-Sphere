import api from "../api/api";

export async function getProfile() {

    const token = localStorage.getItem("access");

    const response = await api.get(

        "users/profile/",

        {

            headers: {

                Authorization: `Bearer ${token}`,

            },

        }

    );

    return response.data;

}