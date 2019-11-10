const dbConnection = require('../libs/db');


module.exports = {

    async getByUserID(id) {
        const [images] = await dbConnection.promise().query(
            'SELECT name, message FROM images WHERE userID = ?',
            [id]
        );
        return images;
    },

    async insertImage(name, message, userID) {
        await dbConnection.promise().query(
            'INSERT INTO images(name, message, userID) VALUES (?, ?, ?)',
            [name, message, userID]
        );
    }
}