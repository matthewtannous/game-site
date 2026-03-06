/**
 * Data Transfer Object for a user
 */

export class UserDTO {
    constructor({ id = null, username, email, createdAt }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
    }

    // mapper to convert entity to DTO
    static fromEntity(entity) {
        return new UserDTO(entity);
    }
}