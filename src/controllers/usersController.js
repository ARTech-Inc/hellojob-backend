const usersModel = require("../models/usersModel");
const pathExtname = require("path");
const { unlink } = require("fs");
const formResponse = require("../helpers/formResponse");

const usersController = {
  get: (req, res) => {
    return usersModel
      .get(req.query)
      .then((result) => {
        if (result.length == 0) {
          return res
            .status(404)
            .send({ data: result, message: "Data users empty!" });
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
            .send({ data: result, message: `Users ${id} was not found!` });
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
      file: req.file,
      id: req.params.id,
    };

    return usersModel
      .update(request)
      .then((result) => {
        const oldAvatar = result.oldAvatar;
        if (request.file == undefined)
          return formResponse(
            200,
            result,
            `Successfully edit user profile ${request.id} without avatar`,
            res
          );

        unlink(`public/uploads/images/${oldAvatar}`, () => {
          console.log(`Successfully delete ${oldAvatar}`);
        });

        return formResponse(
          200,
          result,
          `Edit user profile ${request.id} success!`,
          res
        );
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

  removeAll: (req, res) => {
    return usersModel
      .removeAll()
      .then((result) => {
        return res.status(200).send({ message: `Deleting all users success!` });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  },
};

module.exports = usersController;
