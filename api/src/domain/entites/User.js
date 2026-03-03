/**
 * Class used to represent a user
 */
export class User {
    constructor({ id = null, username, email, first_name, last_name, password, created_at = null }) {
        this.id = id;
        this.username = username;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
        this.createdAt = created_at;
    }
}