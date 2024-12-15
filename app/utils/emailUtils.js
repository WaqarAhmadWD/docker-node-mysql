// const nodemailer = require("nodemailer");
// const smtpTransport = require("nodemailer-smtp-transport");
// const fs = require("fs");
// const path = require("path");
// const handlebars = require("handlebars");
// const config = require("../config");
// require("dotenv").config();

// // Load the email template
// const emailTemplatePath = path.join(
//   __dirname,
//   "../views/emailTamplates/registrationEmail.hbs"
// );
// const templateHtml = fs.readFileSync(emailTemplatePath, "utf8");
// const template = handlebars.compile(templateHtml);

// const transporter = nodemailer.createTransport({
//   host: config.get("smtp.host"),
//   port: config.get("smtp.port"),
//   secure: config.get("smtp.secure"),
//   auth: {
//     user: config.get("smtp.auth.user"),
//     pass: config.get("smtp.auth.appPassword"),
//   },
//   tls: {
//     rejectUnauthorized: config.get("smtp.tls.rejectUnauthorized"),
//   },
// });

// const sendRegistrationEmail = async (email, assignedRole, OTP) => {
//   try {
//     const mailOptions = {
//       from: config.get("smtp.auth.user"),
//       to: email,
//       subject: "Welcome to Our Service",
//       html: `Hello from spotbooking,<br><br>
//       You have been registered as a ${assignedRole}.<br><br>
//       Your OTP Code is : ${OTP}<br>
//       Please verify your mail after logging in.`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: ", info.response);
//   } catch (error) {
//     console.error("Error sending email: ", error);
//   }
// };

// const sendForgotPasswordEmail = async (email, message) => {
//   try {
//     const mailOptions = {
//       from: config.get("smtp.auth.user"),
//       to: email,
//       subject: "Password Reset Verification Code",
//       html: message,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent: ", info.response);
//   } catch (error) {
//     console.error("Error sending email: ", error);
//   }
// };

// module.exports = {
//   sendRegistrationEmail,
//   sendForgotPasswordEmail,
// };
