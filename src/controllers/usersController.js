const usersModel = require("../models/usersModel");

const usersController = {
  get: (req, res) => {
    return usersModel
      .get()
      .then((result) => {
        if (result.rows == 0) {
          return res.status(404).send({ message: "Data users empty!" });
        } else {
          return res
            .status(200)
            .send({ data: result, message: "Get all data users success!" });
        }
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
  getDetail: (req, res) => {
    const id = req.params.id;
    return usersModel
      .getDetail(id)
      .then((result) => {
        if (result == undefined) {
          return res
            .status(404)
            .send({ message: `Users ${id} was not found!` });
        }
        return res
          .status(200)
          .send({ data: result, message: `Get users ${id} success!` });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
};

module.exports = usersController;
