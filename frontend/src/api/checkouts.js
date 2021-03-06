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

export async function addCheckout(accessToken, exemplarInventoryNumber, readerTicketNumber,
                                       startDate, returnDate) {
    const response = await fetch(CHECKOUTS_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
           readerTicketNumber,
           exemplarInventoryNumber,
           startDate,
           expectedFinishDate: returnDate
        })
    });

    if(!response.ok) {
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

    if(!response.ok) {
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

    if(!response.ok) {
        throw new Error("Checkouts fetching failed");
    }
};
