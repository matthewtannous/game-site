// USING RTK QUERY INSTEAD

/*
import { api } from "../../../services/api";

const BASE = "/games";

export function getAllGames() {
    return api(BASE);
}

export function getAllOneUserDetailedNoMoves(id) {
    return api(`${BASE}/user-no-moves/${id}`);
}

export function getOneGameDetailed(id) {
    return api(`${BASE}/detailed/${id}`);
}

export function deleteGame(id) {
    api(`${BASE}/${id}`, {
        method: "DELETE",
    });
}

export function addMove(gameId, move) {
    api(`${BASE}/play`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, move }),
    });

    // return result ? true : false;
}

export function updateState(gameId, state) {
    api(`${BASE}/state`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId, state }),
    })
}
*/
