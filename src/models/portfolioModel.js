const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const portfolioModel = {
  addPortfolio: ({ id, app_name, link_repo, file }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
        if (error) {
          return reject(error.message);
        } else {
          // for (let i = 0; i < file.length; i++) {
          db.query(
            `INSERT INTO user_portfolios (portfolio_id, user_id, filename, app_name, link_repo) VALUES ('${uuidv4()}', '${
              result.rows[0].id
            }', '${file.filename}', '${app_name}', '${link_repo}')`,
            (errorPortfolio, resultPortfolio) => {
              if (errorPortfolio) {
                return reject(errorPortfolio.message);
              } else {
                // kedepannya query di bawah ini untuk portfolio images
                // db.query(
                //   `INSERT INTO portfolio_images (portfolio_id, user_id, filename, alt_name) VALUES (, result.rows[0].id)`
                // )
                return resolve({
                  id,
                  portfolio_images: file,
                  app_name,
                  link_repo,
                });
              }
            }
          );
          // }
        }
      });
    });
  },
};

module.exports = portfolioModel;
