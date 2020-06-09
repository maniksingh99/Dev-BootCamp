"use strict";
const nodemailer = require("nodemailer");


  module.exports.sendEmail=async function(html){
        // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "maniksingh035@gmail.com", // generated ethereal user
      pass: "lwrkxywucpqlofev", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Manik Singh 👻"maniksingh035@gmail.com', // sender address
    to: "maniksingh035@gmail.com, maniksingh035@gmail.com", // list of receivers
    subject: "Notice", // Subject line
    html: html, // html body
  });
  }





