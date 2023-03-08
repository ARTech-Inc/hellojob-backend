const formResponse = require("../helpers/formResponse");
const exprModel = require("../models/exprModel");

const exprController = {
  addExp: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    if (request.nama_perusahaan.length == 0)
      return formResponse(400, {}, "Company name field should be filled!", res);

    if (request.posisi.length == 0)
      return formResponse(400, {}, "Position field should be filled!", res);

    if (request.tanggal_masuk.length == 0)
      return formResponse(400, {}, "Entry date field should be filled!", res);

    if (request.tanggal_keluar.length == 0)
      return formResponse(400, {}, "Out date field should be filled!", res);

    if (request.deskripsi.length == 0)
      return formResponse(400, {}, "Description field should be filled!", res);

    return exprModel
      .addExp(request)
      .then((result) => {
        if (result == undefined)
          return res
            .status(404)
            .send({ data: result, message: `Users was not found!` });

        return formResponse(
          201,
          result,
          `Successfully add pengalaman kerja at ${request.nama_perusahaan}!`,
          res
        );
      })
      .catch((err) => {
        return formResponse(500, {}, err, res);
      });
  },
};

module.exports = exprController;
