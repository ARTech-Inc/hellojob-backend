const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          if (result.rows.length == 0) {
            return reject("email or password is wrong!");
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              (err, hashingResult) => {
                if (err) {
                  return reject("email or password is wrong");
                }
                if (!hashingResult) {
                  return reject("email or password is wrong");
                } else {
                  return resolve(result.rows[0]);
                }
              }
            );
          }
        }
      });
    });
  },
  register: ({
    name,
    email,
    phone,
    password,
    perusahaan = "",
    bidang_perusahaan = "",
    job_desk = "",
    job_status = "",
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, name, email, phone, perusahaan, bidang_perusahaan, password, job_desk, job_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          uuidv4(),
          name,
          email,
          phone,
          perusahaan,
          bidang_perusahaan,
          password,
          job_desk,
          job_status,
        ],
        (error, result) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({
              name,
              email,
              phone,
              //   password,
              perusahaan,
              bidang_perusahaan,
              // job_desk,
              // job_status,
            });
          }
        }
      );
    });
  },
};

module.exports = authModel;
