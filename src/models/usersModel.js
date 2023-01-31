const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");
const e = require("express");

const usersModel = {
  get: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
};

module.exports = usersModel;
