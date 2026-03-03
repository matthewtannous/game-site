/**
 * The UserRepository class contains methods to perform CRUD operations on
 * the users table
 */

import { pool } from "../../config/db.js";
import { User } from "../entites/User.js";
import bcrypt from "bcrypt";

const saltRounds = 10; // for hashing passwords

export class UserRepository {
    /**
     * Creates a user
     * @param {User} param0
     * @returns User
     */
    async create({ username, firstName, lastName, email, password }) {
        const sql = `INSERT INTO users (username, email, first_name, last_name, password)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, username, email, first_name, last_name, created_at;
        `;

        // password = await bcrypt.hash(password, saltRounds);
        const { rows } = await pool.query(sql,
            [username, email, firstName, lastName,
                await bcrypt.hash(password, saltRounds)]);
        return new User(rows[0]);
    }

    /**
     * Updates data of a user
     * @param {int} id
     * @param {User} param1
     * @returns User if id and param1 arguments are valid, null otherwise
     */
    async update(id, { username, firstName, lastName, email, password }) {
        const sql = `UPDATE users SET username = $1, email = $2, 
            first_name = $3, last_name = $4, password = $5 WHERE id = $6
            RETURNING id, username, email, first_name, last_name, created_at;
        `;

        // password = await bcrypt.hash(password, saltRounds);
        const { rows } = await pool.query(sql,
            [username, email, firstName, lastName,
                await bcrypt.hash(password, saltRounds), id]);
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Updates email of a user (used in frontend)
     * @param {int} id
     * @param {string} email
     * @returns User if id and param1 arguments are valid, null otherwise
     */
    async updateEmail(id, email) {
        const sql = `UPDATE users SET email = $1 WHERE id = $2
        RETURNING id, username, first_name, last_name, email, created_at;
        `;

        const { rows } = await pool.query(sql, [email, id]);
        return rows[0] ? new User(rows[0]) : null;
    }


    /**
     * Updates email of a user (used in frontend)
     * @param {int} id
     * @param {string} password
     * @returns User if id and param1 arguments are valid, null otherwise
     */
    async updatePassword(id, password) {
        const sql = `UPDATE users SET password = $1 WHERE id = $2
        RETURNING id, username, first_name, last_name, email, created_at;
        `;

        const { rows } = await pool.query(sql, [await bcrypt.hash(password, saltRounds), id]);
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Lists all users
     * @returns List<User>
     */
    async findAll() {
        const sql = `SELECT id, email, username, first_name, last_name, created_at
        FROM users ORDER BY id DESC;`;

        // let rows = await pool.query(sql);
        // rows = rows.rows;
        const { rows } = await pool.query(sql);
        return rows.map(row => new User(row));
    }

    /**
     * Finds a user using his id
     * @param {int} id
     * @returns User if id is valid, null otherwise
     */
    async findById(id) {
        const sql = `SELECT id, username, email, first_name, last_name, created_at
        FROM users WHERE id = $1;`

        const { rows } = await pool.query(sql, [id]);
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Finds a user using his username
     * @param {string} username
     * @returns User if username is valid, null otherwise
     */
    async findByUsername(username) {
        const sql = `SELECT id, username, email, first_name, last_name, created_at
        FROM users WHERE username = LOWER($1);`

        const { rows } = await pool.query(sql, [username]);
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Finds a user using his username (returning password for login)
     * @param {string} username
     * @returns User if username is valid, null otherwise
     */
    async findByUsernameGettingPassword(username) {
        const sql = `SELECT id, username, first_name, last_name, email, password, created_at
        FROM users WHERE username = LOWER($1);`;

        const { rows } = await pool.query(sql, [username]);
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Finds a user using his id (returning password for password change)
     * @param {int} int
     * @returns User if username is valid, null otherwise
     */
    async findByIdGettingPassword(id) {
        const sql = `SELECT id, username, first_name, last_name, email, password, created_at
        FROM users WHERE id = $1;`;

        const { rows } = await pool.query(sql, [id]);
        return rows[0] ? new User(rows[0]) : null;
    }

    /**
     * Deletes a user using his id
     * @param {int} id
     * @returns int
     */
    async delete(id) {
        const { rowCount } = await pool.query(`DELETE FROM users WHERE id = $1;`, [id]);
        return rowCount > 0;
    }
}