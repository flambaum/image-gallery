const dbConnection = require('../libs/db');
const bcrypt = require(`bcrypt`);

const saltRounds = 10;

module.exports = {
    async create(username, password) {
        if (password) {
            password = await bcrypt.hash(password, saltRounds);
        }

        await dbConnection.promise().query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, password]
        );
        return await this.findByUsername(username);
    },

    async findByID(id) {
        const [rows] = await dbConnection.promise().query(
            'SELECT id, username FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    async findByUsername(username) {
        const [rows] = await dbConnection.promise().query(
            'SELECT id, username FROM users WHERE username = ?',
            [username]
        );
        
        return rows[0];
    },

    async validPassword(id, password) {
        const [rows] = await dbConnection.promise().query(
            'SELECT password FROM users WHERE id = ?',
            [id]
        );
        const userpass = rows[0].password;
        return bcrypt.compare(password, userpass);
    },
}