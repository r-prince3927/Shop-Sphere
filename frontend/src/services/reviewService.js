import api from "../api/api";

/*
==========================================
Get Reviews (Product Details)
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
Create Review
==========================================
*/

export async function createReview(

    productId,

    review

) {

    const response = await api.post(

        `products/${productId}/reviews/`,

        review

    );

    return response.data;

}

/*
==========================================
Update Review
==========================================
*/

export async function updateReview(

    reviewId,

    review

) {

    const response = await api.patch(

        `products/reviews/${reviewId}/update/`,

        review

    );

    return response.data;

}

/*
==========================================
Delete Review
==========================================
*/

export async function deleteReview(

    reviewId

) {

    const response = await api.delete(

        `products/reviews/${reviewId}/delete/`

    );

    return response.data;

}