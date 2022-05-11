import { DOMAIN_URL } from "../config/config";

const READERS_URL = DOMAIN_URL + '/readers';
const READERS_STATISTIC_URL = READERS_URL + '/statistics';

export async function getAllReaders(accessToken) {
    const response = await fetch(READERS_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Readers fetching failed");
    }
};

export async function getReadersWhoReadBook(accessToken, bookIsbn) {
    const response = await fetch(READERS_STATISTIC_URL + `/readBook?isbn=${bookIsbn}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Readers fetching failed");
    }
};

export async function getReadersAndNumberOfReadBooks(accessToken) {
    const response = await fetch(READERS_STATISTIC_URL + `/numberOfBooks`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Readers fetching failed");
    }
};

export async function getOwerReaders(accessToken) {
    const response = await fetch(READERS_STATISTIC_URL + `/owers`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Readers fetching failed");
    }
};

export async function deleteReader(accessToken, readerTicketNumber) {
    const response = await fetch(READERS_URL + `/${readerTicketNumber}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(!response.ok) {
        throw new Error("Readers fetching failed");
    }
};
