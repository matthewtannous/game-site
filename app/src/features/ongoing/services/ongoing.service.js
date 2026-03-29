import { api } from "../../../services/api";

const BASE = "/ongoing";

export function getAllOngoing() {
    return api(BASE);
}

export function getOneOngoingDetailedNoMoves(id) {
    return api(`${BASE}/user-no-moves/${id}`);
}

export function getOneOngoingDetailed(id) {
    return api(`${BASE}/detailed/${id}`);
}

export function deleteOngoing(id) {
    api(`${BASE}/${id}`, {
        method: "DELETE",
    });
}

export function addMove(gameId, move) {
    const result = api(`${BASE}/play`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, move }),
    });

    return result ? true : false;
}