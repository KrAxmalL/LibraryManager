import { DOMAIN_URL } from "../config/config";

const BOOKS_URL = DOMAIN_URL + '/books';

const BOOKS_STATISTICS_URL = BOOKS_URL + '/statistics';

export async function getBooksSummary(accessToken) {
    const response = await fetch(BOOKS_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function getBookDetails(accessToken, bookIsbn) {
    const response = await fetch(BOOKS_URL + `/${bookIsbn}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function getBooksWithPopularity(accessToken) {
    const response = await fetch(BOOKS_STATISTICS_URL + '/popularity', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function getBooksWithAllAvailableExemplars(accessToken) {
    const response = await fetch(BOOKS_STATISTICS_URL + '/allExemplarsAvailable', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function getBooksOfAreaWithReadersFromCity(accessToken, areaCipher, city) {
    const response = await fetch(BOOKS_STATISTICS_URL + `/booksOfAreaAndCity?area=${areaCipher}&city=${city}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function getBooksWhereAllReadersHavePhone(accessToken, phoneNumber) {
    const response = await fetch(BOOKS_STATISTICS_URL + `/readAllReadersWithPhone?phone=${encodeURIComponent(phoneNumber)}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function getAllAuthors(accessToken) {
    const response = await fetch(BOOKS_URL + '/authors', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Book fetching failed");
    }
};

export async function addNewBook(accessToken, bookToAdd) {
    const response = await fetch(BOOKS_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(bookToAdd)
    });

    if(!response.ok) {
        throw new Error("Book adding failed");
    }
};

export async function setAreasForBook(accessToken, bookIsbn, areas) {
    const response = await fetch(BOOKS_URL + `/${bookIsbn}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            areaCiphers: areas
        })
    });

    if(!response.ok) {
        throw new Error("Book areas changing failed");
    }
};

export async function deleteBook(accessToken, bookIsbn) {
    const response = await fetch(BOOKS_URL + `/${bookIsbn}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(!response.ok) {
        throw new Error("Book deletion failed");
    }
};
