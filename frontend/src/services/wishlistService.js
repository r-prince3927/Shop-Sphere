export function getWishlist() {

    const wishlist = localStorage.getItem("wishlist");

    return wishlist ? JSON.parse(wishlist) : [];

}

export function addToWishlist(product) {

    const wishlist = getWishlist();

    const exists = wishlist.find(

        item => item.id === product.id

    );

    if (!exists) {

        wishlist.push(product);

    }

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

}

export function removeFromWishlist(id) {

    const wishlist = getWishlist().filter(

        item => item.id !== id

    );

    localStorage.setItem(

        "wishlist",

        JSON.stringify(wishlist)

    );

}

export function isWishlisted(id) {

    return getWishlist().some(

        item => item.id === id

    );

}