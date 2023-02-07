const exprModel = require("../models/exprModel");

const exprController = {
  addExp: (req, res) => {
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
    return exprModel
      .addExp(request)
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
};

module.exports = exprController;
