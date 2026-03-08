/**
 * Data Transfer Object for a user
 */

export class ChallengeDTO {
    constructor({ id = null, senderId, receiverId, gameType, createdAt }) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.gameType = gameType;
        this.createdAt = createdAt;
    }

    // mapper to convert entity to DTO
    static fromEntity(entity) {
        return new ChallengeDTO(entity);
    }
}