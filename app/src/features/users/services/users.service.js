import { api } from "../../../services/api";

const BASE = "/users";

export function getUsers() {
    return api(BASE);
}

export function getUser(id) {
    return api(`${BASE}/${id}`);
}

export function getUsersExcept(id) {
    return api(`${BASE}/all-except/${id}`);
}

export function saveUser(data, id) {
    api(id ? `${BASE}/${id}` : "${BASE}", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function deleteUser(id) {
    api(`${BASE}/${id}`, {
        method: "DELETE",
    });
}