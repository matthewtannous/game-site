import { api } from "../../../services/api";

export async function login({ username, password }) {
    try {
        const res = await api("/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        return { ok: res.ok, data: await res.json() };
    } catch (error) {
        return {
            ok: false,
            data: (error.message === "Api Error" ?
                "Authentication Error" : error.message)
        };
    }
}

export async function register({ username, email, password }) {
    try {
        const res = await api("/auth/register", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        return { ok: res.ok, data: await res.json() };
    } catch (error) {
        return {
            ok: false,
            data: (error.message === "Api Error" ?
                "Authentication Error" : error.message)
        };
    }
}