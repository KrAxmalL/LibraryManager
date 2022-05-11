import { DOMAIN_URL } from "../config/config";

const REPLACEMENT_ACTS_URL = DOMAIN_URL + '/replacements';

export async function getAllReplacementActs(accessToken) {
    const response = await fetch(REPLACEMENT_ACTS_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Replacement acts fetching failed");
    }
};