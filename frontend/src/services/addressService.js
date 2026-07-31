import api from "../api/api";

/*
==========================================
Get All Addresses
==========================================
*/

export async function getAddresses() {

    const response = await api.get(
        "addresses/"
    );

    return response.data;

}

/*
==========================================
Add Address
==========================================
*/

export async function addAddress(data) {

    const token = localStorage.getItem("access");

    const response = await api.post(

        "addresses/",

        data,

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
Update Address
==========================================
*/

export async function updateAddress(id,data){

    const response = await api.patch(

        `addresses/${id}/`,

        data

    );

    return response.data;

}

/*
==========================================
Delete Address
==========================================
*/

export async function deleteAddress(id) {

    const token = localStorage.getItem("access");

    const response = await api.delete(

        `addresses/${id}/`,

        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

    );

    return response.data;

}