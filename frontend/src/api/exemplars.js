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

export async function replaceExemplar(accessToken, exemplarToBeReplaced, exemplarToReplace, replacementDate) {
    const response = await fetch(EXEMPLARS_URL + `/${exemplarToBeReplaced}/replace`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            replacementDate,
            newExemplarInventoryNumber: exemplarToReplace,
        })
    });

    if(!response.ok) {
        throw new Error("Exemplar replacing failed");
    }
};

export async function deleteExemplar(accessToken, exemplarInventoryNumber) {
    const response = await fetch(EXEMPLARS_URL + `/${exemplarInventoryNumber}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(!response.ok) {
        throw new Error("Exemplar deletion failed");
    }
};