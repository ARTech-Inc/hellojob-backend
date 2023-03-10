const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (error, result) => {
          if (error) return reject(error.message);

          const data = result.rows[0];
          bcrypt.compare(password, data.password, (err, hashingResult) => {
            if (err)
              return reject("Email or password is wrong! Please try again.");
            if (!hashingResult)
              return reject("Email or password is wrong! Please try again.");
            return resolve(data);
          });
        }
      );
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
    file,
    role,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, name, email, phone, perusahaan, bidang_perusahaan, password, job_desk, job_status, avatar, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
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
          file,
          role,
        ],
        (error) => {
          if (error) return reject(error.message);
          return resolve({
            name,
            email,
            phone,
            perusahaan,
            bidang_perusahaan,
            job_desk,
            job_status,
            file,
            role,
          });
        }
      );
    });
  },
  // REGISTER OTOMATIS INCLUDE AVATAR UNTUK NANTI DIUPDATE SAAT EDIT PROFILE (BELUM FIX)
  // register: ({
  //   id,
  //   name,
  //   email,
  //   phone,
  //   password,
  //   perusahaan = "",
  //   bidang_perusahaan = "",
  //   job_desk = "",
  //   job_status = "",
  //   // file,
  //   file = "",
  // }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       `INSERT INTO users (id, name, email, phone, perusahaan, bidang_perusahaan, password, job_desk, job_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
  //       [
  //         uuidv4(),
  //         name,
  //         email,
  //         phone,
  //         perusahaan,
  //         bidang_perusahaan,
  //         password,
  //         job_desk,
  //         job_status,
  //       ],
  //       (error, result) => {
  //         if (error) {
  //           return reject(error.message);
  //         } else {
  //           // if array / multiple
  //           // for (let i = 0; i < file.length; i++) {
  //           //   db.query(
  //           //     `INSERT INTO user_avatars (avatar_id, user_id, filename, name) VALUES ('${uuidv4()}', '${
  //           //       result.rows[0].id
  //           //     }' '${file[i].filename}', '${name}')`
  //           //   );
  //           // }
  //           // if single
  //           db.query(
  //             `INSERT INTO user_avatars (avatar_id, user_id, filename, name) VALUES ('${uuidv4()}', '${
  //               result.rows[0].id
  //             }' '${file}', '${name}')`
  //           );
  //           return resolve({
  //             id,
  //             name,
  //             email,
  //             phone,
  //             //   password,
  //             perusahaan,
  //             bidang_perusahaan,
  //             user_avatar: file,
  //             // job_desk,
  //             // job_status,
  //           });
  //         }
  //       }
  //     );
  //   });
  // },
};

module.exports = authModel;
