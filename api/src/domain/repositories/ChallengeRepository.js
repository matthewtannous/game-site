import { pool } from "../../config/db.js";
import { Challenge } from "../entites/Challenge.js";

export class ChallengeRepository {

    async create({ senderId, receiverId, gameType }) {
        const sql = `INSERT INTO challenges (sender_id, receiver_id, game_type)
                VALUES ($1, $2, (SELECT id FROM games WHERE name = $3))
                RETURNING *;
                `;

        const { rows } = await pool.query(sql, [senderId, receiverId, gameType]);
        return new Challenge(rows[0]);
    }

    async update(id, { senderId, receiverId, gameType }) {
        const sql = `UPDATE challenges SET sender_id = $1, receiver_id = $2,
                game_type = (SELECT id FROM games WHERE name = $3)
                WHERE id = $4
                RETURNING *;
                `;

        // password = await bcrypt.hash(password, saltRounds);
        const { rows } = await pool.query(sql, [senderId, receiverId, gameType, id]);
        return rows[0] ? new Challenge(rows[0]) : null;
    }

    async findAll() {
        const sql = `SELECT * FROM challenges ORDER BY created_at DESC;`;

        const { rows } = await pool.query(sql);
        return rows.map(row => new Challenge(row));
    }

    async findById(id) {
        const sql = `SELECT * FROM challenges WHERE id = $1;`

        const { rows } = await pool.query(sql, [id]);
        return rows[0] ? new Challenge(rows[0]) : null;
    }

    async delete(id) {
        const sql = `DELETE FROM challenges WHERE id = $1;`;
        const { rowCount } = await pool.query(sql, [id]);
        return rowCount > 0;
    }

    // TODOOO
    async findAllDetailed() {
        const sql = `  ORDER BY created_at DESC;`;

        const { rows } = await pool.query(sql);
        return rows.map(row => new Challenge(row));
    }

    async findByIdDetailed() {
        const sql = `;`

        const { rows } = await pool.query(sql, [id]);
        return rows[0] ? new Challenge(rows[0]) : null;

    }

}