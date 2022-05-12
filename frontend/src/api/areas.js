import { DOMAIN_URL } from "../config/config";

const AREAS_URL = DOMAIN_URL + '/areas';

const AREAS_STATISTICS_URL = AREAS_URL + '/statistics';

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
        throw new Error("Areas fetching failed");
    }
};

export async function getTakenBooksForAreasForPeriod(accessToken, startDate, endDate) {
    const response = await fetch(AREAS_STATISTICS_URL + `/takenBooksForPeriod?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Areas fetching failed");
    }
};

export async function addNewArea(accessToken, areaToAdd) {
    const response = await fetch(AREAS_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(areaToAdd)
    });

    if(!response.ok) {
        throw new Error("Area adding failed");
    }
};