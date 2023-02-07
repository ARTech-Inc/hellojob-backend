const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const skillModel = {
  addSk: ({ id, skill_name }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          db.query(
            `INSERT INTO user_skills (skill_id, user_id, skill_name) VALUES ('${uuidv4()}', '${
              result.rows[0].id
            }', '${skill_name}')`,
            (errorSkill, resultSkill) => {
              if (errorSkill) {
                return reject(errorSkill.message);
              } else {
                return resolve({
                  id,
                  skill_name,
                });
              }
            }
          );
        }
      });
    });
  },
};

module.exports = skillModel;
