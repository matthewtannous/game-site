import bcrypt from "bcrypt";

import { UserDTO } from "../domain/dto/UserDTO.js";

export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(username, password) {
        try {
            const user = await this.userRepository.findByUsernameGettingPassword(username);
            if (!user) { // username not found 
                throw new Error("Username not found");
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error("Invalid password");
            }

            return UserDTO.fromEntity(user);
        } catch (error) {
            throw new Error(`Could not log you in: ${error.message}`);
        }
    }


    async register(data) {
        try {
            if (!data || !data.username || !data.email || !data.password) {
                throw new Error('Missing required fields: username, email, password');
            }
            const user = await this.userRepository.create(data);
            return UserDTO.fromEntity(user);

        } catch (error) {
            let message = "";
            if (error.message == 'duplicate key value violates unique constraint \"users_username_key\"') {
                message = "This username is already taken. Try another one";
            } else {
                message = error.message;
            }
            throw new Error(`Failed to create user: ${message}`);
        }
    }
}