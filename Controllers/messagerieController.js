"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'danial.hegmann@ethereal.email',
        pass: 'Trzm8hjdPFPaX49D9d'
    }
});

  // send mail with defined transport object
  let info =  transporter.sendMail({
    from: 'meriemmenous1@gmail.com', // sender address
    to: "meriemmenous1@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
  },
  function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })
