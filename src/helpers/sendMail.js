// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: user.email,
//   from: process.env.MAIL_FROM,
//   subject: "Thank you for registration",
//   text: `Please, <a href="http://localhost:3000/api/auth/registration_confirmations/${verificationToken}">confirm<a> your email address `,
//   html: `Please, <a href="http://localhost:3000/api/auth/registration_confirmations/${verificationToken}">confirm<a> your email address `,
// };

// await sgMail.send(msg);

const nodemailer = require("nodemailer");

const sendMail = async (email, subject, message) => {
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true, // true,
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.MAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const emailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: subject,
    text: message,
  };

  try {
    const { response } = await transporter.sendMail(emailOptions);
    console.log("nodemailer", response);
  } catch (err) {
    console.log("nodemailer", err.response);
  }
};
module.exports = {
  sendMail,
};
