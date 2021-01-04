const db = require('../../config/db');

function find(filters, table) {
  let query = `SELECT * FROM ${table}`;

  if (filters) {
    Object.keys(filters).map((key) => {
      query += ` ${key}`;

      Object.keys(filters[key]).map((field) => {
        query += ` ${field} = '${filters[key][field]}'`;
      });
    });
  }

  return db.query(query);
}

const Base = {
  init({ table }) {
    if (!table) throw new Error('Invalid Params');

    this.table = table;

    return this;
  },

  async find(id) {
    const results = await find({ where: { id } }, this.table);
    return results.rows[0];
  },

  async findAll(filters) {
    const results = await find(filters, this.table);
    return results.rows;
  },

  async delete(id) {
    return db.query(`DELETE FROM ${this.table} WHERE id = ${id}`);
  },
};

module.exports = Base;
