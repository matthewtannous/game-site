/**
 * Class used to represent a challenge
 */
export class Challenge {
    constructor({ id = null, sender_id, receiver_id, game_type, created_at = null }) {
        this.id = id;
        this.senderId = sender_id;
        this.receiverId = receiver_id;
        this.gameType = game_type;
        this.createdAt = created_at;
    }
}