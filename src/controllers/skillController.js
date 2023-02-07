const skillModel = require("../models/skillModel");

const skillController = {
  addSk: (req, res) => {
    const request = {
      ...req.body,
      id: req.params.id,
    };
    console.log(request.skill_name.length);
    if (request.skill_name.length == 0) {
      return res.status(400).send({ message: `Skill field should be filled!` });
    }
    return skillModel
      .addSk(request)
      .then((result) => {
        if (result == undefined) {
          return res
            .status(404)
            .send({ data: result, message: `User was not found!` });
        }
        console.log(result);
        return res.status(201).send({
          data: result,
          message: `Add skill for user ${request.id} is success!`,
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
  },
};

module.exports = skillController;
