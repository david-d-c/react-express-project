const knex = require('../knex');

const fetchSong = async (songId) => {
    const url = `https://genius-song-lyrics1.p.rapidapi.com/song/details/?id=${songId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e83074ae9msh01a992d70f3dac5p1d8bc3jsn11454281692e',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

class Playlist {
    static async add(userId, songId) {
        const query = `INSERT INTO playlist (user_id, song_id)
          VALUES (?, ?) RETURNING *`;
        const { rows } = await knex.raw(query, [userId, songId]);
        return rows;
    }
    static async list() {
        const query = 'SELECT * FROM playlist';
        const { rows } = await knex.raw(query);
        // use the constructor to hide each user's passwordHash
        return null;
    }

    static async find(userId) {
        const query = 'SELECT song_id FROM playlist WHERE user_id = ?';
        const args = [userId];
        const { rows } = await knex.raw(query, args);
        const user = rows[0];
        return null;
    }

    static async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = ?';
        const args = [username];
        const { rows } = await knex.raw(query, args);
        const user = rows[0];
        return user ? new User(user) : null;
    }

    static async deleteAll() {
        return knex.raw('TRUNCATE users;');
    }

    update = async (username) => { // dynamic queries are easier if you add more properties
        const rows = await knex('users')
            .where({ id: this.id })
            .update({ username })
            .returning('*');

        const updatedUser = rows[0];
        return updatedUser ? new User(updatedUser) : null;
    };
}