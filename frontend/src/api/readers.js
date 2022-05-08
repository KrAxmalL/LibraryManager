import { DOMAIN_URL } from "../config/config";

const READERS_URL = DOMAIN_URL + '/readers';

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
        throw new Error("Checkouts fetching failed");
    }
};
