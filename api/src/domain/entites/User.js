/**
 * Class used to represent a user
 */
export class User {
    constructor({ id = null, username, email, password, created_at = null }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.createdAt = created_at;
    }
}