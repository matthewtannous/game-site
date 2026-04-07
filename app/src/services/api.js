/*
For authentication routes, this api returns the raw data
without parsing it to JSON.

For other routes, data is converted to JSON for easier processing

In case of a DELETE call, nothing is returned
*/
const BASE_URL = import.meta.env.VITE_API_URL

export const api = async (endpoint, options = {}) => {
    const res = await fetch(
        `${BASE_URL}${endpoint}`, {
        credentials: "include",
        ...options,
    },
    );

    // if (options && options.method === "DELETE")
    //     return;

    if (!res.ok) {
        throw new Error(await res.json());
    }
    if (endpoint.startsWith("/auth"))
        return res;

    return await res.json();
}