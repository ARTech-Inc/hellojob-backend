const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");
const e = require("express");

const usersModel = {
  get: (queryParams) => {
    const { search = "", category = "", limit = 100, page = 1 } = queryParams;
    return new Promise((resolve, reject) => {
      // db.query(
      //   `SELECT * FROM users WHERE name ILIKE '%${search}%' AND job_status ILIKE '%${category}%' LIMIT ${limit} OFFSET ${
      //     (page - 1) * limit
      //   }`,
      //   (error, result) => {
      //     if (error) {
      //       return reject(error.message);
      //     } else {
      //       return resolve(result.rows);
      //     }
      //   }
      // );
      db.query(
        // COMPARE
        // `SELECT
        //   usr.id, usr.name, usr.email, usr.phone, usr.password, usr.domisili, usr.job_desk, usr.job_status, usr.description, usr.perusahaan, usr.bidang_perusahaan, usr.akun_instagram, usr.akun_linkedin, usr.akun_github, usr.role,
        //   json_agg(row_to_json(usrexp)) work_experiences
        //   FROM users AS usr
        //   INNER JOIN (SELECT experience_id, nama_perusahaan, posisi, tanggal_masuk, tanggal_keluar, deskripsi FROM user_experiences) AS usrexp
        //   ON usr.id = usrexp.user_id
        //   GROUP BY usr.id
        //   `,
        `SELECT
        usr.id, usr.name, usr.email, usr.phone, usr.password, usr.domisili, usr.job_desk, usr.job_status, usr.description, usr.perusahaan, usr.bidang_perusahaan, usr.akun_instagram, usr.akun_linkedin, usr.akun_github, usr.role,
        json_agg(row_to_json(usrexp)) work_experiences
        FROM users AS usr
        INNER JOIN user_experiences AS usrexp
        ON usr.id = usrexp.user_id
        GROUP BY usr.id`,
        (error, result) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
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
  add: ({
    id,
    name,
    email,
    phone,
    password,
    domisili,
    job_desk,
    job_status,
    description,
    perusahaan,
    bidang_perusahaan,
    akun_instagram,
    akun_linkedin,
    akun_github,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, name, email, phone, password, domisili, job_desk, job_status, description, perusahaan, bidang_perusahaan, akun_instagram, akun_linkedin, akun_github) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          uuidv4(),
          name,
          email,
          phone,
          password,
          domisili,
          job_desk,
          job_status,
          description,
          perusahaan,
          bidang_perusahaan,
          akun_instagram,
          akun_linkedin,
          akun_github,
        ],
        (error, result) => {
          if (error) {
            return reject(error.message);
          } else {
            return resolve({
              id,
              name,
              email,
              phone,
              password,
              domisili,
              job_desk,
              job_status,
              description,
              perusahaan,
              bidang_perusahaan,
              akun_instagram,
              akun_linkedin,
            });
          }
        }
      );
    });
  },

  addExpr: ({
    id,
    user_id,
    nama_perusahaan,
    posisi,
    tanggal_masuk,
    tanggal_keluar,
    deskripsi,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `INSERT INTO user_experiences (experience_id, user_id, nama_perusahaan, posisi, tanggal_masuk, tanggal_keluar, deskripsi) VALUES ('${uuidv4()}', '${
              result.rows[0].id
            }' ,'${nama_perusahaan}', '${posisi}','${tanggal_masuk}', '${tanggal_keluar}', '${deskripsi}')`,
            (error, result) => {
              if (error) {
                return reject(error.message);
              } else {
                return resolve({
                  user_id,
                  nama_perusahaan,
                  posisi,
                  tanggal_masuk,
                  tanggal_keluar,
                  deskripsi,
                });
              }
            }
          );
        }
      });
    });
  },

  update: ({
    id,
    name,
    phone,
    email,
    domisili,
    job_desk,
    job_status,
    description,
    bidang_perusahaan,
    akun_instagram,
    akun_linkedin,
    akun_github,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `UPDATE users SET name = '${
              name || result.rows[0].name
            }', phone = '${phone || result.rows[0].phone}', email = '${
              email || result.rows[0].email
            }', domisili = '${
              domisili || result.rows[0].domisili
            }', job_desk = '${
              job_desk || result.rows[0].job_desk
            }', job_status = '${
              job_status || result.rows[0].job_status
            }', description = '${
              description || result.rows[0].description
            }', bidang_perusahaan = '${
              bidang_perusahaan || result.rows[0].bidang_perusahaan
            }', akun_instagram = '${
              akun_instagram || result.rows[0].akun_instagram
            }', akun_linkedin = '${
              akun_linkedin || result.rows[0].akun_linkedin
            }', akun_github = '${
              akun_github || result.rows[0].akun_github
            }' WHERE id = '${id}'`,
            (error, result) => {
              if (error) {
                return reject(error.message);
              } else {
                return resolve({
                  name,
                  phone,
                  email,
                  domisili,
                  job_desk,
                  job_status,
                  description,
                  bidang_perusahaan,
                  akun_instagram,
                  akun_linkedin,
                  akun_github,
                });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          return resolve(result);
        }
      });
    });
  },
};

module.exports = usersModel;
