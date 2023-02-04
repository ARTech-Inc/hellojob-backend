const usersModel = require("../models/usersModel");

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

  addExpr: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    if (request.nama_perusahaan.length == 0) {
      return res
        .status(400)
        .send({ message: "Company name field should be filled!" });
    }
    if (request.posisi.length == 0) {
      return res
        .status(400)
        .send({ message: "Position field should be filled!" });
    }
    if (request.tanggal_masuk.length == 0) {
      return res
        .status(400)
        .send({ message: "Entry date field should be filled!" });
    }
    if (request.tanggal_keluar.length == 0) {
      return res
        .status(400)
        .send({ message: "Out date field should be filled!" });
    }
    if (request.deskripsi.length == 0) {
      return res
        .status(400)
        .send({ message: "Description field should be filled!" });
    }
    return usersModel
      .addExpr(request)
      .then((result) => {
        if (result == undefined) {
          return res
            .status(404)
            .send({ data: result, message: `Users was not found!` });
        }
        return res
          .status(201)
          .send({ data: result, message: `Add pengalaman kerja success!` });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },

  addSkill: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    // console.log(request);
    // if(request)
    if (request.skill_name.length == 0) {
      return res.status(400).send({ message: "Skill field should be filled!" });
    }
    return usersModel
      .addSkill(request)
      .then((result) => {
        if (result == undefined) {
          return res
            .status(404)
            .send({ data: result, message: `Users was not found!` });
        }
        return res
          .status(201)
          .send({ data: result, message: `Add skill success!` });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },

  addPortf: (req, res) => {
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
    console.log(request.file);
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
    return usersModel
      .addPortf(request)
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
