"use strict";
const nodemailer = require("nodemailer");


  module.exports.sendEmail=async function(html){
        // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: "xxxx", // generated ethereal user
      pass: "xxxx", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"xxxx 👻"xxxx', // sender address
    to: "xxxxx, xxxxx", // list of receivers
    subject: "Notice", // Subject line
    html: html, // html body
  });
  }





