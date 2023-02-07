const portfolioModel = require("../models/portfolioModel");

const portfolioController = {
  addPortfolio: (req, res) => {
    const request = {
      ...req.body,
      file: req.file,
      id: req.params.id,
    };
    if (request.app_name.length == 0) {
      return res
        .status(400)
        .send({ message: `App name field should be filled!` });
    }
    if (request.link_repo.length == 0) {
      return res
        .status(400)
        .send({ message: `Link repo field should be filled!` });
    }
    // console.log(request.file);
    if (request.file == undefined) {
      return res.status(400).send({ message: `Image must be sent!` });
    }
    if (request.file.length == 0) {
      return res.status(400).send({ message: `Image must be sent!` });
    }
    if (request.file.length > 1) {
      return res
        .status(400)
        .send({ message: `Sorry, for now can upload one image only!` });
    }
    // console.log(request);
    return portfolioModel
      .addPortfolio(request)
      .then((result) => {
        // console.log(result);
        if (result == undefined) {
          return res
            .status(404)
            .send({ data: result, message: `Users was not found!` });
        }
        return res
          .status(201)
          .send({ data: result, message: `Add portfolio success!` });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
};

module.exports = portfolioController;
