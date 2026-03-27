import { api } from "../../../services/api";

const BASE = "/challenges";

export function getChallenges() {
    // return api("${BASE}");
    return api(`${BASE}/detailed`);
}

export function getChallenge(id) {
    return api(`${BASE}/${id}`);
}

export function createChallenge(data, id) {
    return api(`${BASE}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function deleteChallenge(id) {
    api(`${BASE}/${id}`, {
        method: "DELETE",
    });
}

export function getSentChallenges(id) {
    return api(`${BASE}/sent/${id}`);
}

export function getReceivedChallenges(id) {
    return api(`${BASE}/received/${id}`);
}

export function acceptChallenge(id) {
    api(`${BASE}/accept/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
}