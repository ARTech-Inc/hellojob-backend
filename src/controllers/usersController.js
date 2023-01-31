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
  add: (req, res) => {
    const request = {
      ...req.body,
    };
    return usersModel
      .add(request)
      .then((result) => {
        return res
          .status(201)
          .send({ data: result, message: "Add data user success!" });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
  update: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    return usersModel
      .update(request)
      .then((result) => {
        if (result == undefined) {
          return res.status(404).send({ message: "User id not found!" });
        }
        return res
          .status(200)
          .send({ data: result, message: "Edit user profile success!" });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
  remove: (req, res) => {
    const id = req.params.id;
    return usersModel
      .remove(id)
      .then((result) => {
        return res
          .status(200)
          .send({ message: `Deleting users ${id} success!` });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },
};

module.exports = usersController;
