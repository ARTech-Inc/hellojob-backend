const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const exprModel = {
  addExp: ({
    id,
    nama_perusahaan,
    posisi,
    tanggal_masuk,
    tanggal_keluar,
    deskripsi,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) return reject(error.message);
        const userID = result.rows[0].id;
        db.query(
          `INSERT INTO user_experiences (experience_id, user_id, nama_perusahaan, posisi, tanggal_masuk, tanggal_keluar, deskripsi) VALUES ('${uuidv4()}', '${userID}' ,'${nama_perusahaan}', '${posisi}','${tanggal_masuk}', '${tanggal_keluar}', '${deskripsi}')`,
          (errorExp) => {
            if (errorExp) return reject(errorExp.message);
            return resolve({
              user_id: id,
              nama_perusahaan,
              posisi,
              tanggal_masuk,
              tanggal_keluar,
              deskripsi,
            });
          }
        );
      });
    });
  },
};

module.exports = exprModel;
