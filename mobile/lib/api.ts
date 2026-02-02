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

    const res = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers,
    })

    let data = null;

    try {
        data = await res.json();
    } catch {}

    if(!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
    }

    return data;
}