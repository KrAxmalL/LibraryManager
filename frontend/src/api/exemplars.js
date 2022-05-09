import { DOMAIN_URL } from "../config/config";

const EXEMPLARS_URL = DOMAIN_URL + '/exemplars';

export async function getAllExemplars(accessToken) {
    const response = await fetch(EXEMPLARS_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Exemplars fetching failed");
    }
};

export async function addExemplar(accessToken, bookIsbn, inventoryNumber, shelf) {
    const response = await fetch(EXEMPLARS_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            bookIsbn,
            inventoryNumber,
            shelf
        })
    });

    if(!response.ok) {
        throw new Error("Exemplars fetching failed");
    }
};