const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const formResponse = require("../helpers/formResponse");
require("dotenv").config();
const { JWT_PRIVATE_KEY } = process.env;

const authController = {
  login: (req, res) => {
    const { email, password } = req.body;
    if (email == undefined || password == undefined)
      return formResponse(500, {}, "Something went wrong on login form!", res);

    if (email.length == 0)
      return formResponse(400, {}, "Email field should be filled!", res);

    if (password.length == 0)
      return formResponse(400, {}, "Password field should be filled!", res);

    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          {
            id: result.id,
            role: result.role,
          },
          JWT_PRIVATE_KEY,
          { expiresIn: "2 days" },
          (error, tokenResult) => {
            return formResponse(
              200,
              {
                token: tokenResult,
                user: { id: result.id, email: result.email, role: result.role },
              },
              "Login success! Enjoy your journey!",
              res
            );
          }
        );
      })
      .catch((err) => {
        return res.status(400).send({ message: err });
      });
  },

  register: (req, res) => {
    const {
      name,
      email,
      phone,
      password,
      perusahaan,
      bidang_perusahaan,
      job_desk,
      job_status,
      role,
    } = req.body;

    if (
      name == undefined ||
      email == undefined ||
      phone == undefined ||
      password == undefined
    )
      return formResponse(
        500,
        {},
        "Something went wrong on register form!",
        res
      );

    if (name.length == 0)
      return formResponse(400, {}, "Name field should be filled!", res);

    if (email.length == 0)
      return formResponse(400, {}, "Email field should be filled!", res);

    if (!email.includes("@gmail.com"))
      return formResponse(400, {}, "Email should use gmail.com format!", res);

    if (phone.length == 0)
      return formResponse(400, {}, "Phone field should be filled!", res);

    if (password.length == 0)
      return formResponse(400, {}, "Password field should be filled!", res);

    if (password.length <= 8)
      return formResponse(400, {}, "Password length min. 9 character", res);

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return formResponse(500, {}, err.message, res);
      const request = {
        name,
        email,
        phone,
        perusahaan,
        bidang_perusahaan,
        password: hash,
        job_desk,
        job_status,
        file: req.file,
        role,
      };
      return authModel
        .register(request)
        .then((result) => {
          return formResponse(
            201,
            result,
            `Register ${result.name} is success!`,
            res
          );
        })
        .catch((error) => {
          return res.status(500).send({ message: error });
        });
    });
  },
  // REGISTER OTOMATIS INCLUDE AVATAR UNTUK NANTI DIUPDATE SAAT EDIT PROFILE (BELUM FIX)
  // register: (req, res) => {
  //   const {
  //     name,
  //     email,
  //     phone,
  //     password,
  //     perusahaan,
  //     bidang_perusahaan,
  //     job_desk,
  //     job_status,
  //   } = req.body;
  //   if (
  //     name == undefined ||
  //     email == undefined ||
  //     phone == undefined ||
  //     password == undefined
  //   ) {
  //     return res
  //       .status(500)
  //       .send({ message: "Something went wrong on register form!" });
  //   } else {
  //     if (name.length == 0) {
  //       return res.status(400).send({ message: "Nama tidak boleh kosong!" });
  //     } else if (email.length == 0) {
  //       return res.status(400).send({ message: "Email tidak boleh kosong!" });
  //     } else if (!email.includes("@gmail.com")) {
  //       return res.status(400).send({ message: "Email harus memakai gmail!" });
  //     } else if (phone.length == 0) {
  //       return res
  //         .status(400)
  //         .send({ message: "Nomor handphone tidak boleh kosong!" });
  //     } else if (password.length == 0) {
  //       return res
  //         .status(400)
  //         .send({ message: "Password tidak boleh kosong!" });
  //     } else {
  //       if (password.length <= 8) {
  //         return res
  //           .status(400)
  //           .send({ message: "Panjang password harus lebih dari 8 karakter" });
  //       } else {
  //         bcrypt.hash(password, 10, (err, hash) => {
  //           if (err) {
  //             return res.status(500).send({ message: err.message });
  //           } else {
  //             const request = {
  //               name,
  //               email,
  //               phone,
  //               perusahaan,
  //               bidang_perusahaan,
  //               password: hash,
  //               job_desk,
  //               job_status,
  //               // file: req.files,
  //               file: req.file,
  //             };
  //             console.log(request);
  //             return authModel
  //               .register(request)
  //               .then((result) => {
  //                 return res
  //                   .status(201)
  //                   .send({ message: "Register success!", data: result });
  //               })
  //               .catch((error) => {
  //                 return res.status(500).send({ message: error });
  //               });
  //           }
  //         });
  //       }
  //     }
  //   }
  // },
};

module.exports = authController;
