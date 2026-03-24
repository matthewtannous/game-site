import { api } from "../../../services/api";

export function getUsers() {
    return api("/users");
}

export function getUser(id) {
    return api(`/users/${id}`);
}

export function getUsersExcept(id) {
    return api(`/users/all-except/${id}`);
}

export function saveUser(data, id) {
    api(id ? `/users/${id}` : "/users", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function deleteUser(id) {
    api(`/users/${id}`, {
        method: "DELETE",
    });
}