import { api } from "../../../services/api";

export function getChallenges() {
    // return api("/challenges");
    return api("/challenges/detailed");
}

export function getChallenge(id) {
    return api(`/challenges/${id}`);
}

export function saveChallenge(data, id) {
    api(id ? `/challenges/${id}` : "/departments", {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
}

export function deleteChallenge(id) {
    api(`/challenges/${id}`, {
        method: "DELETE",
    });
}

export function getSentChallenges(id) {
    return api(`/challenges/sent/${id}`);
}

export function getReceivedChallenges(id) {
    return api(`/challenges/received/${id}`);
}

export function acceptChallenge(id) {
    
}