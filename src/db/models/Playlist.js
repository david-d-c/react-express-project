const knex = require('../knex');

class Playlist {

    static async addSong(userId, songId) {
        const query = `INSERT INTO playlist (user_id, song_id)
          VALUES (?, ?) RETURNING *`;
        const { rows } = await knex.raw(query, [userId, songId]);
        return rows;
    }
    static async listSongIds(userId) {
        const query = 'SELECT song_id FROM playlist WHERE user_id = ? RETURNING *';
        const { rows } = await knex.raw(query, [userId]);
        return rows;
    }

    static async findSong(id) {
        const query = 'SELECT song_id FROM playlist WHERE id = ?';
        const args = [id];
        const { rows } = await knex.raw(query, args);
        //const user = rows[0];
        return rows;
    }

    static async deleteSong(id) {
        const query = 'DELETE FROM playlist WHERE id = ?';
        const args = [id];
        const { rows } = await knex.raw(query, args);
        return null;
    }

    static async deleteAll() {
        return knex.raw('TRUNCATE playlist;');
    }

    // update = async (username) => { // dynamic queries are easier if you add more properties
    //     const rows = await knex('users')
    //         .where({ id: this.id })
    //         .update({ username })
    //         .returning('*');

    //     const updatedUser = rows[0];
    //     return updatedUser ? new User(updatedUser) : null;
    // };
}