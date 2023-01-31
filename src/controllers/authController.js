const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const e = require("express");
// const jwt
// const {JWT_PRIVATE_KEY}

const authController = {
  register: (req, res) => {
    const { name, email, phone, password } = req.body;
    if (
      name == undefined ||
      email == undefined ||
      phone == undefined ||
      password == undefined
    ) {
      return res
        .status(500)
        .send({ message: "Something went wrong on register form!" });
    } else {
      if (name.length == 0) {
        return res.status(400).send({ message: "Nama tidak boleh kosong!" });
      } else if (email.length == 0) {
        return res.status(400).send({ message: "Email tidak boleh kosong!" });
      } else if (!email.includes("@gmail.com")) {
        return res.status(400).send({ message: "Email harus memakai gmail!" });
      } else if (phone.length == 0) {
        return res
          .status(400)
          .send({ message: "Nomor handphone tidak boleh kosong!" });
      } else if (password.length == 0) {
        return res
          .status(400)
          .send({ message: "Password tidak boleh kosong!" });
      } else {
        if (password.length <= 8) {
          return res
            .status(400)
            .send({ message: "Panjang password harus lebih dari 8 karakter" });
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({ message: err.message });
            } else {
              const request = {
                name,
                email,
                phone,
                password: hash,
              };
              return authModel
                .register(request)
                .then((result) => {
                  return res
                    .status(201)
                    .send({ message: "Register success!", data: result });
                })
                .catch((error) => {
                  return res.status(500).send({ message: error });
                });
            }
          });
        }
      }
    }
  },
};

module.exports = authController;
