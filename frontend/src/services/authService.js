import api from "../api/api";

export async function login(email, password) {

    const response = await api.post(
        "users/login/",
        {
            email,
            password,
        }
    );

    return response.data;

}

export async function register(
    username,
    email,
    phone_number,
    password
) {

    const response = await api.post(
        "users/register/",
        {
            username,
            email,
            phone_number,
            password,
        }
    );

    return response.data;

}