import { DOMAIN_URL } from "../config/config";

const CHECKOUTS_URL = DOMAIN_URL + '/checkouts';

export async function getCheckoutsForUser(accessToken) {
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
