import { DOMAIN_URL } from "../config/config";

const CHECKOUTS_URL = DOMAIN_URL + '/checkouts';

export async function getAllCheckouts(accessToken) {
    const response = await fetch(CHECKOUTS_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Checkouts fetching failed");
    }
};

export async function continueCheckout(accessToken, checkoutNumber, newDate) {
    const response = await fetch(CHECKOUTS_URL + `/${checkoutNumber}/continue`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            newExpectedFinishDate: newDate
        })
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Checkouts fetching failed");
    }
};

export async function finishCheckout(accessToken, checkoutNumber, finishDate, shelf) {
    const response = await fetch(CHECKOUTS_URL + `/${checkoutNumber}/finish`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            realFinishDate: finishDate,
            newShelfForExemplar: shelf
        })
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Checkouts fetching failed");
    }
};
