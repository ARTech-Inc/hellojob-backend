const db = require("../helpers/db");
const { v4: uuidv4 } = require("uuid");

const portfolioModel = {
  addPortfolio: ({ id, app_name, link_repo, file }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT id FROM users WHERE id = '${id}'`, (error, result) => {
        const userID = result.rows[0].id;
        if (error) return reject(error.message);

        db.query(
          `INSERT INTO user_portfolios (portfolio_id, user_id, app_name, link_repo) VALUES ('${uuidv4()}', '${userID}', '${app_name}', '${link_repo}')`,
          (errorPortfolio) => {
            if (errorPortfolio) return reject(errorPortfolio.message);

            db.query(
              `SELECT portfolio_id, app_name FROM user_portfolios WHERE user_id = '${userID}'`,
              (errorGetPortfolioID, resultGetPortfolioData) => {
                const portfolioID = resultGetPortfolioData.rows[0].portfolio_id;
                const appName = resultGetPortfolioData.rows[0].app_name;
                if (errorGetPortfolioID)
                  return reject(errorGetPortfolioID.message);

                for (let i = 0; i < file.length; i++) {
                  db.query(
                    `INSERT INTO portfolio_images (image_id, portfolio_id, user_id, app_name, filename) VALUES ('${uuidv4()}', '${portfolioID}', '${userID}', '${appName}', '${
                      file[i].filename
                    }') `,
                    (errorAddPortfolio) => {
                      if (errorAddPortfolio)
                        return reject(errorAddPortfolio.message);
                      return resolve({
                        id,
                        portfolio_id: portfolioID,
                        app_name,
                        link_repo,
                        portfolio_images: file,
                      });
                    }
                  );
                }
              }
            );
          }
        );
      });
    });
  },
  // addPortfolio: ({ id, app_name, link_repo, file }) => {
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
  //           (errorPortfolio, resultPortfolio) => {
  //             if (errorPortfolio) {
  //               return reject(errorPortfolio.message);
  //             } else {
  //               // kedepannya query di bawah ini untuk portfolio images
  //               // db.query(
  //               //   `INSERT INTO portfolio_images (portfolio_id, user_id, filename, alt_name) VALUES (, result.rows[0].id)`
  //               // )
  //               return resolve({
  //                 id,
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
};

module.exports = portfolioModel;
