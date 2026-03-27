import { api } from "../../../services/api";

const BASE = "/ongoing";

export function getAllOngoing() {
    return api(BASE);
}

export function getOneOngoingDetailedNoMoves(id) {
    return api(`${BASE}/detailed-no-moves/${id}`);
}

export function getOneOngoing(id) {
    return api(`${BASE}/${id}`);
}

export function deleteOngoing(id) {
    api(`${BASE}/${id}`, {
        method: "DELETE",
    });
}