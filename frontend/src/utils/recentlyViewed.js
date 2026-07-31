const STORAGE_KEY = "recentlyViewedProducts";

export function saveRecentlyViewed(product) {

    const existing = JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    ) || [];

    const filtered = existing.filter(

        (item) => item.id !== product.id

    );

    filtered.unshift(product);

    const latestFive = filtered.slice(0, 5);

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(latestFive)

    );

}

export function getRecentlyViewed() {

    return JSON.parse(

        localStorage.getItem(STORAGE_KEY)

    ) || [];

}