const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const usersModel = {
  get: (queryParams) => {
    const {
      search = "",
      catJobStatus = "",
      catSkill = "",
      limit = 4,
      page = 1,
    } = queryParams;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT
        usr.id, usr.name, usr.email, usr.phone, usr.password, usr.domisili, usr.job_desk, usr.job_status, usr.description, usr.perusahaan, usr.bidang_perusahaan, usr.akun_instagram, usr.akun_linkedin, usr.akun_github, usr.role, usr.avatar,
        json_agg(row_to_json(usrskill)) skills
        FROM users AS usr
        LEFT JOIN (SELECT user_id, skill_name FROM user_skills) AS usrskill
        ON usr.id = usrskill.user_id
        ${
          search
            ? `WHERE name ILIKE '%${search}%' OR skill_name ILIKE '%${search}%' `
            : ""
        }
        ${catJobStatus ? `WHERE job_status ILIKE '%${catJobStatus}%'` : ""}
        ${catSkill ? `WHERE skill_name ILIKE '%${catSkill}%'` : ""}
        GROUP BY usr.id LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
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
      db.query(
        `
        SELECT
        usr.id, usr.name, usr.email, usr.phone, usr.password, usr.domisili, usr.job_desk, usr.job_status, usr.description, usr.perusahaan, usr.bidang_perusahaan, usr.akun_instagram, usr.akun_linkedin, usr.akun_github, usr.role, usr.avatar,
        json_agg(row_to_json(usrskill)) skills
        FROM users AS usr
        LEFT JOIN user_skills AS usrskill
        ON usr.id = usrskill.user_id
        WHERE usr.id = '${id}'
        GROUP BY usr.id
        `,
        (error, result) => {
          const userData = result.rows[0];
          if (error) return reject(error.message);
          db.query(
            `SELECT * FROM user_experiences WHERE user_id = '${id}'`,
            (errorExp, resultExp) => {
              if (errorExp) return reject(errorExp.message);
              db.query(
                `SELECT portf.portfolio_id, portf.user_id, portf.app_name, portf.link_repo,
                json_agg(row_to_json(portfimg)) portfolio_images
                FROM user_portfolios AS portf
                LEFT JOIN portfolio_images AS portfimg
                ON portf.portfolio_id = portfimg.portfolio_id
                WHERE portf.portfolio_id = portfimg.portfolio_id
                GROUP BY portf.portfolio_id
                `,
                (errorPortf, resultPortf) => {
                  if (errorPortf) return reject(errorPortf.message);
                  return resolve({
                    ...userData,
                    work_experiences: resultExp.rows,
                    portfolio: resultPortf.rows,
                  });
                }
              );
            }
          );
        }
      );
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

  // addExpr: ({
  //   id,
  //   user_id,
  //   nama_perusahaan,
  //   posisi,
  //   tanggal_masuk,
  //   tanggal_keluar,
  //   deskripsi,
  // }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
  //       if (error) {
  //         return reject(error.message);
  //       } else {
  //         db.query(
  //           `INSERT INTO user_experiences (experience_id, user_id, nama_perusahaan, posisi, tanggal_masuk, tanggal_keluar, deskripsi) VALUES ('${uuidv4()}', '${
  //             result.rows[0].id
  //           }' ,'${nama_perusahaan}', '${posisi}','${tanggal_masuk}', '${tanggal_keluar}', '${deskripsi}')`,
  //           (error, result) => {
  //             if (error) {
  //               return reject(error.message);
  //             } else {
  //               console.log(nama_perusahaan);
  //               return resolve({
  //                 user_id,
  //                 nama_perusahaan,
  //                 posisi,
  //                 tanggal_masuk,
  //                 tanggal_keluar,
  //                 deskripsi,
  //               });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // },

  // addSkill: ({ id, user_id, skill_name }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
  //       if (error) {
  //         return reject(error.message);
  //       } else {
  //         db.query(
  //           `INSERT INTO user_skills (skill_id, user_id, skill_name) VALUES ('${uuidv4()}', '${
  //             result.rows[0].id
  //           }' , '${skill_name}')`,
  //           (error, result) => {
  //             if (error) {
  //               return reject(error.message);
  //             } else {
  //               return resolve({
  //                 user_id,
  //                 skill_name,
  //               });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // },

  // addPortf: ({ id, app_name, link_repo, file }) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
  //       if (error) {
  //         return reject(error.message);
  //       } else {
  //         // for (let i = 0; i < file.length; i++) {
  //         db.query(
  //           `INSERT INTO user_portfolios (portfolio_id, user_id, filename, app_name, link_repo) VALUES ('${uuidv4()}', '${
  //             result.rows[0].id
  //           }', '${file.filename}', '${app_name}', '${link_repo}')`,
  //           (err, reslt) => {
  //             if (err) {
  //               return reject(err.message);
  //             } else {
  //               // kedepannya query di bawah ini untuk portfolio images
  //               // db.query(
  //               //   `INSERT INTO portfolio_images (portfolio_id, user_id, filename, alt_name) VALUES (, result.rows[0].id)`
  //               // )
  //               return resolve({
  //                 user_id: id,
  //                 portfolio_images: file,
  //                 app_name,
  //                 link_repo,
  //               });
  //             }
  //           }
  //         );
  //         // }
  //       }
  //     });
  //   });
  // },

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
    file,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = '${id}'`, (error, result) => {
        const dataUser = result.rows[0];
        const oldAvatar = dataUser.avatar;
        if (error) return reject(error.message);
        if (dataUser == undefined) return reject("User not found!");
        db.query(
          `UPDATE users SET name = '${name || dataUser.name}', phone = '${
            phone || dataUser.phone
          }', email = '${email || dataUser.email}', domisili = '${
            domisili || dataUser.domisili
          }', job_desk = '${job_desk || dataUser.job_desk}', job_status = '${
            job_status || dataUser.job_status
          }', description = '${
            description || dataUser.description
          }', bidang_perusahaan = '${
            bidang_perusahaan || dataUser.bidang_perusahaan
          }', akun_instagram = '${
            akun_instagram || dataUser.akun_instagram
          }', akun_linkedin = '${
            akun_linkedin || dataUser.akun_linkedin
          }', akun_github = '${
            akun_github || dataUser.akun_github
          }', avatar = '${
            file ? file.filename : dataUser.avatar
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
                oldAvatar: oldAvatar,
                avatar: file,
              });
            }
          }
        );
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

  removeAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users`, (error, result) => {
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
