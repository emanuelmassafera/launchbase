const db = require("../../config/db");
const { graduation, age, date } = require("../../lib/utils");

module.exports = {

    all(callback) {
        db.query(`SELECT * FROM students ORDER BY name ASC`, function (err, results) {
            if (err) throw `Database Error! ${err}`;

            callback(results.rows);
        });
    },

    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth,
                email,
                year,
                hours
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.year,
            data.hours
        ];

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`SELECT * FROM students WHERE id=$1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`;

            callback(results.rows[0]);
        });
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                email=($4),
                year=($5),
                hours=($6)
            WHERE id=$7
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.year,
            data.hours,
            data.id
        ];

        db.query(query, values, function (err, results) {
            if (err) throw `Database Error! ${err}`;

            callback();
        });
    },

    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id=$1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`;

            callback();
        });
    }
}