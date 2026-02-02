import {getToken} from "./auth";

const BASE_URL = "http://localhost:3000";

export async function apiFetch(
    path: string,
    options: RequestInit = {}
) {
    const token = await getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    }

    return fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    });
}