import { DOMAIN_URL } from "../config/config";

const AREAS_URL = DOMAIN_URL + '/areas';

export async function getAllAreas(accessToken) {
    const response = await fetch(AREAS_URL, {
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