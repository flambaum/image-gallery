const mysql = require("mysql2");
const { database : options } = require('../config.json');

const conn = mysql.createConnection(options);

conn.query(
	`CREATE TABLE IF NOT EXISTS images (
		name VARCHAR(64) NOT NULL,
		message VARCHAR(200),
		userID INT NOT NULL
	)`,
	function(err, results, fields) {
	  if (err) console.log(err);
	}
);

conn.query(
	`CREATE TABLE IF NOT EXISTS users (
		id INT AUTO_INCREMENT PRIMARY KEY,
		username VARCHAR(32) NOT NULL,
		password VARCHAR(60),
		CONSTRAINT UC_User UNIQUE (id, username)
	)`,
	function(err, results, fields) {
		if (err) console.log(err);
	}
);

module.exports = conn;