import { DOMAIN_URL } from "../config/config";

const AUTHENTICATION_URL = DOMAIN_URL + '/authentication';
const LOGIN_URL = AUTHENTICATION_URL + '/login';

export async function login(email, password) {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if(response.ok) {
        return await response.json();
    }
    else {
        throw new Error("Login failed");
    }
};
