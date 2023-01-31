const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  register: ({ name, email, phone, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, name, email, phone, password) VALUES ($1, $2, $3, $4, $5)`,
        [uuidv4(), name, email, phone, password],
        (error, result) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({ name, email, phone });
          }
        }
      );
    });
  },
};

module.exports = authModel;
